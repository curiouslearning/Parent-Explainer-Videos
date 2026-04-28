import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error('Missing env vars');
  process.exit(1);
}

const text = `You've probably heard that screens are bad for children. That too much time on a phone damages their development, ruins their sleep, shortens their attention span.
And you want to protect your child. So when someone hands them a phone, you feel uncertain. Is this helping them — or harming them?
That is a good question. And it deserves an honest answer.`;

async function generateAudio(text) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-audio',
      modalities: ['text', 'audio'],
      audio: { voice: 'nova', format: 'mp3' },
      messages: [
        {
          role: 'system',
          content: 'Read the following text aloud with a warm, calm, supportive tone — like a trusted community health worker speaking directly to a parent. Speak naturally and clearly at a measured pace. Do not add commentary, just read the text as provided.',
        },
        { role: 'user', content: text },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const audioData = data.choices?.[0]?.message?.audio?.data;
  if (!audioData) throw new Error('No audio data in response');
  return Buffer.from(audioData, 'base64');
}

function getDurationMs(filePath) {
  const out = execSync(`ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`).toString().trim();
  return Math.round(parseFloat(out) * 1000);
}

async function main() {
  const audioDir = join(__dirname, '../public/audio');
  console.log('Re-recording s1_opening...');
  const buf = await generateAudio(text);
  const filePath = join(audioDir, 's1_opening.mp3');
  writeFileSync(filePath, buf);
  const durationMs = getDurationMs(filePath);
  console.log(`s1_opening: ${durationMs}ms (${(durationMs/1000).toFixed(1)}s)`);
  console.log('\nUpdate SCENE_DURATIONS s1_opening to:', durationMs);
}

main().catch(e => { console.error(e); process.exit(1); });
