import { writeFileSync, mkdirSync } from 'fs';
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

const SCENES = [
  {
    key: 's1_opening',
    text: `You want the best for your child. You want them to do well in school, to be confident, to love learning. And you might think the fastest way to get there is to start them on English as early as possible. But research tells us something surprising. The single most powerful thing you can do for your child's education is to make sure they learn to read in your language first.`,
  },
  {
    key: 's2_brain',
    text: `Here's why. When a child learns to read, their brain is doing something incredible. It's connecting the sounds they already know — the words they've heard since before they were born — to symbols on a page. If those sounds are familiar, that connection happens quickly and naturally. But if a child is learning to read in a language they're still learning to speak — like trying to solve two puzzles at the same time — progress is much slower. And far more children give up.`,
  },
  {
    key: 's3_research',
    text: `Studies from across Africa, Asia, and South America consistently show: children who learn to read in their mother tongue in the early years go on to perform better in all subjects — including English, later on. They read faster. They understand more. They stay in school longer. Because once a child truly knows how to read, they can transfer it to any language.`,
  },
  {
    key: 's4_identity',
    text: `When a child sees their language written down — when they find stories and learning materials in the words they speak at home — it sends them a powerful message: Your language matters. Your family matters. You matter. Children who feel that pride and belonging in the classroom are more engaged, more confident, more willing to learn.`,
  },
  {
    key: 's5_reassurance',
    text: `Now, you might wonder: but won't this slow down their English? The evidence says no. A child with strong mother tongue literacy picks up a second language more easily — because they already understand how reading works. Think of it like building a house. You wouldn't skip the foundations to put the roof on faster. Strong foundations make everything above them more stable.`,
  },
  {
    key: 's6_cta',
    text: `So what can you do? Read with your child in your language. Tell them stories. Sing songs. Every minute your child spends reading in their mother tongue is an investment that pays back across their entire education. Your language is not a barrier. It is the bridge.`,
  },
];

async function generateSceneAudio(text) {
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
  mkdirSync(audioDir, { recursive: true });

  const sceneFiles = [];
  const durations = {};

  for (const scene of SCENES) {
    console.log(`Generating ${scene.key} (${scene.text.length} chars)...`);
    const buf = await generateSceneAudio(scene.text);
    const filePath = join(audioDir, `${scene.key}.mp3`);
    writeFileSync(filePath, buf);
    const durationMs = getDurationMs(filePath);
    durations[scene.key] = durationMs;
    sceneFiles.push(filePath);
    console.log(`  -> ${durationMs}ms (${(durationMs/1000).toFixed(1)}s)`);
  }

  // Concatenate into one narration.mp3
  console.log('\nConcatenating scene audio files...');
  const listFile = join(audioDir, 'scene_list.txt');
  writeFileSync(listFile, sceneFiles.map(f => `file '${f}'`).join('\n'));
  execSync(`ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${join(audioDir, 'narration.mp3')}"`, { stdio: 'inherit' });

  console.log('\nFinal SCENE_DURATIONS (copy into VideoTemplate.tsx):');
  console.log(JSON.stringify(durations, null, 2));

  const total = Object.values(durations).reduce((a, b) => a + b, 0);
  console.log(`Total: ${total}ms (${(total/1000).toFixed(1)}s)`);
}

main().catch(e => { console.error(e); process.exit(1); });
