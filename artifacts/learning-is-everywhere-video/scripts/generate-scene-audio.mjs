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
    text: `Your child was born curious. Watch them for ten minutes and you'll see it — the questions, the touching, the trying and trying again. Before they ever set foot in a classroom, they had already learned to walk, to talk, to understand the world around them.
That didn't happen at school. It happened because of you. Because of your home. Because curiosity, when it is welcomed, finds a way.
That same curiosity doesn't stop at the school gate. And neither does learning.`,
  },
  {
    key: 's2_learning_around',
    text: `Think about what your child learns just by being with you.
When you count out change at the market, your child is learning numbers. When you name the plants in the field, or the birds overhead, your child is learning language and the world. When you tell the story of how your grandmother grew up, or why the rains come when they do — your child is learning to listen, to remember, to understand.
This is not a small thing. This is the foundation that everything else is built on.
In many of the world's most successful education systems, families understand this. They don't see learning as something that happens only inside a classroom, only when a teacher is present. They see it as something that flows through the whole day — at the table, on the walk to the well, in the stories told before sleep.
That understanding is one of the most powerful advantages a child can have.`,
  },
  {
    key: 's3_hours',
    text: `A child who spends just fifteen minutes a day learning at home — reading together, practising letters, talking about stories — gains more than ninety hours of learning in a single year.
Ninety hours. Think about what that means. That is the equivalent of weeks of additional school time, happening quietly, in your own home, at no cost. Apps like Curious Reader with games and books for learning to read is an easy way to extend learning at home.
Over five years of primary school, that is more than four hundred and fifty hours of learning that would not otherwise have happened. Hours that build vocabulary, strengthen reading, deepen understanding. Hours that compound — because a child who reads a little better this month finds next month's learning easier, and the month after that easier still.`,
  },
  {
    key: 's4_answers',
    text: `Perhaps you are thinking: but I didn't finish school myself. How can I be my child's teacher?
Here is what the research tells us. Children don't need a parent who knows all the answers. They need a parent who is curious alongside them.
Ask your child what they learned today — and really listen. Let them teach you something they know. Read together, even if you read slowly, even if you stumble over words. Ask questions about a story. Wonder out loud. Say: I don't know — let's find out together.
That posture — that open, interested, wondering posture — teaches your child something more valuable than any single lesson. It teaches them that learning is a lifelong habit. That not knowing something is the beginning of finding out, not a reason to stop.
A child who grows up in a home where questions are welcomed and curiosity is celebrated will carry that with them long after they leave school.`,
  },
  {
    key: 's5_school',
    text: `Learning in school works best when it is part of something larger — when it connects to a home where learning is alive.
In communities where families see themselves as partners in their children's education, children do better. They attend more. They persist through difficulty. They believe they are capable. Because someone at home has already shown them that they are.
You are not waiting for school to make your child a learner. Your child already is one. School is where that goes further.`,
  },
  {
    key: 's6_close',
    text: `Fifteen minutes a day. A question asked. A story told. A word sounded out together.
These moments don't feel like education. They feel like family. But they are both.
Your child's curiosity is not waiting for a classroom. It is alive right now, in your home, looking for somewhere to go.
Give it somewhere to go.`,
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

  const durations = {};

  for (const scene of SCENES) {
    console.log(`Generating ${scene.key} (${scene.text.length} chars)...`);
    const buf = await generateSceneAudio(scene.text);
    const filePath = join(audioDir, `${scene.key}.mp3`);
    writeFileSync(filePath, buf);
    const durationMs = getDurationMs(filePath);
    durations[scene.key] = durationMs;
    console.log(`  -> ${durationMs}ms (${(durationMs/1000).toFixed(1)}s)`);
  }

  console.log('\nFinal SCENE_DURATIONS (copy into VideoTemplate.tsx):');
  console.log(JSON.stringify(durations, null, 2));

  const total = Object.values(durations).reduce((a, b) => a + b, 0);
  console.log(`Total: ${total}ms (${(total/1000).toFixed(1)}s)`);
}

main().catch(e => { console.error(e); process.exit(1); });
