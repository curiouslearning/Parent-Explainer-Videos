import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

const text = `You've probably heard that screens are bad for children. That too much time on a phone damages their development, ruins their sleep, shortens their attention span. And you want to protect your child. So when someone hands them a phone, you feel uncertain. Is this helping them — or harming them? That is a good question. And it deserves an honest answer.`;

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
if (!audioData) throw new Error('No audio data');

const audioDir = join(__dirname, '../public/audio');
const outPath = join(audioDir, 's1_opening.mp3');
writeFileSync(outPath, Buffer.from(audioData, 'base64'));

const durationMs = Math.round(parseFloat(
  execSync(`ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${outPath}"`).toString().trim()
) * 1000);
console.log(`s1_opening regenerated: ${durationMs}ms`);

// Reconcat all scenes
const sceneKeys = ['s1_opening', 's2_context', 's3_research', 's4_opportunity', 's5_active', 's6_close'];
const listFile = join(audioDir, 'scene_list.txt');
const { writeFileSync: wfs } = await import('fs');
wfs(listFile, sceneKeys.map(k => `file '${join(audioDir, k + '.mp3')}'`).join('\n'));
execSync(`ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${join(audioDir, 'narration.mp3')}"`, { stdio: 'inherit' });
console.log('narration.mp3 updated. New s1 duration:', durationMs);
console.log('Update SCENE_DURATIONS s1_opening to:', durationMs);
