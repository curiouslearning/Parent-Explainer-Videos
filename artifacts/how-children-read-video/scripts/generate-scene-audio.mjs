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
    text: `You don't need to be able to read to help your child become a reader. Say that again to yourself. You don't need to be able to read to help your child become a reader. Because reading doesn't begin with books. It begins long before that — with you, and with the way you talk to your child every single day.`,
  },
  {
    key: 's2_pre_reader',
    text: `Long before a child can read a single word, their brain is getting ready. Every time you talk to your baby, you are building their brain. Every word you say is a word they are storing — like seeds going into the ground. They can't use those seeds yet. But they are there, growing.

Then something magical starts to happen. Children begin to notice that words are made of sounds. That the word mama starts with a sound. That baba and ball begin the same way. That a song has a rhythm, and words rhyme, and language has a kind of music to it.

This is called phonological awareness — a big phrase that just means: your child is beginning to hear the building blocks of language. You build this every time you sing a song with your child. Every time you clap the syllables of their name. Every time you tell a story, recite a proverb, play a word game. You have been teaching your child to read — without even knowing it.`,
  },
  {
    key: 's3_feed_monster',
    text: `This is exactly where Feed the Monster begins. The game introduces children to letters — one by one, in a careful order. Each letter comes with its sound. Children hear the sound, see the shape, and practise matching them — by feeding the right letter to their monster.

It is simple. It is playful. And it is building exactly the foundation that reading requires — connecting sounds that children already know in their spoken language to the shapes they will see on a page. A child doesn't need to know how to read to start. They just need to be able to listen — and every child can do that.

And because the game responds to every tap — celebrating when they get it right, gently correcting when they don't — it is patient in a way that is very hard for any person to be, for as long as a child needs.`,
  },
  {
    key: 's4_early_reader',
    text: `Then something shifts. Your child starts to decode — to crack the code. They look at a word and they don't just see a shape. They see sounds. B — A — T. Bat. They sounded it out. They read it. The first time a child does this on their own, it is one of the great moments of childhood. It feels like a superpower arriving.

At this stage, children need practice. Lots of it. They need to see letters in words, words in sentences, sentences that mean something to them — stories about things they recognise, animals they know, families that look like theirs. They need to read just a little beyond what is easy — stretching just enough to grow — but not so far that they feel lost. This is the stage where Curious Reader comes in.`,
  },
  {
    key: 's5_curious_reader',
    text: `Curious Reader is a library of interactive books — stories your child can listen to, follow along with, and begin to read for themselves. The words are highlighted as they are spoken. So even if a child cannot read every word yet, they are connecting the sound of language to the look of language — one of the most important steps a new reader can take.

The books are designed for children at this early stage — short, clear, and full of pictures that help carry the meaning. And because the app knows where your child is, it can guide them to books that are just right for them — not too hard, not too easy. Here is something important. The books are in African languages. In the words your child already speaks at home. Because a child learning to read in a language they already love will always go further, faster.`,
  },
  {
    key: 's6_emerging_reader',
    text: `And then — with time, with practice, with stories and games and patient repetition — something opens up. Your child begins to read without thinking about it. The decoding becomes automatic. The sounds become words without effort. And suddenly reading is not a task. It is a door.

A door to stories. To knowledge. To worlds they have never seen. To possibilities that go far beyond the village, the neighbourhood, the life they were born into. This is what you are building towards. Not just a child who can pass a test — but a child who reads because they want to. Because it gives them something. Because it is theirs.`,
  },
  {
    key: 's7_close',
    text: `Every stage of that journey starts at home. With you. You don't need to read the book. You just need to sit beside the child who is.`,
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
