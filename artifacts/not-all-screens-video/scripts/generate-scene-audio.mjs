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
    text: `You've probably heard that screens are bad for children. That too much time on a phone damages their development, ruins their sleep, shortens their attention span. And you want to protect your child. So when someone hands them a phone, you feel uncertain. Is this helping them — or harming them? That is a good question. And it deserves an honest answer.`,
  },
  {
    key: 's2_context',
    text: `Most of the research warning about screen time was done in wealthy countries — the United States, Europe, Australia — where children often spend four, five, six hours a day in front of televisions, tablets, and phones. Where a child might come home from school and disappear into a screen until bedtime. Where the concern is real, because the exposure is enormous.

That is not your situation. If your child spends thirty minutes on a phone playing an educational game, they are not in the same category as a child who watches three hours of television before dinner. The warning was not written for your family. And applying it to your family — without asking whether it fits — can mean missing out on something genuinely valuable. Context matters. And your context is different.`,
  },
  {
    key: 's3_research',
    text: `Here is what the research does say — clearly and consistently — about educational apps specifically. When children use well-designed learning apps, something remarkable happens. The app responds to them. If they get something wrong, it tries again in a different way. If they master something, it moves them forward. It meets them exactly where they are — not where the slowest child in the class is, not where the fastest child is. Where they are.

This is called personalised learning. And it is something that even the best teacher, with forty children in a classroom, cannot fully provide. There is simply not enough time in a school day for a teacher to sit with each child and respond to their individual needs in the way a good app can. A child playing a reading game is getting immediate feedback on every single attempt. Every tap, every answer, every try. That feedback loop — try, learn, try again — is one of the most powerful conditions for learning that we know of.`,
  },
  {
    key: 's4_opportunity',
    text: `In your community, most children are not drowning in screen time. They are getting very little of it. That means the question for your family is not how do we reduce screens — it's how do we make the most of them.

A child who spends twenty minutes a day on a reading app is not losing twenty minutes of childhood. They are gaining twenty minutes of focused, responsive, individualised learning that they would not otherwise have had. Learning that adapts to them. Learning that is patient — that never gets tired, never loses its temper, never moves on before they are ready. Over a year, those twenty minutes a day become more than a hundred hours of learning. Learning in your language. At your child's pace. In your home. That is not a threat. That is an opportunity that families in previous generations never had access to.`,
  },
  {
    key: 's5_active',
    text: `Now, not all apps are equal. And it is worth knowing the difference. An app where your child is tapping through puzzles, hearing words spoken aloud, building letters, reading simple sentences — that is active learning. Their brain is working. They are building real skills.

An app where your child is watching videos passively, or playing games with no learning content — that is closer to the screen time the researchers were worried about. The difference is not the screen. It is what the child is doing on the screen. Active, responsive, language-based learning is good for children. The evidence on this is strong. So when your child picks up a phone to learn — don't feel guilty. Feel curious. Sit with them sometimes. Ask them what they're doing. Let them show you what they've learned.`,
  },
  {
    key: 's6_close',
    text: `You are raising a child in a world where a small device can give them access to learning that previous generations could only dream of. Where a game on a phone can teach reading skills that once required years of expensive schooling. That is not something to be afraid of. It is something to be thoughtful about — and grateful for. The screen is not the enemy. Passivity is. Curiosity — as always — is the answer. Keep your child curious. And let the tools that support that curiosity do their work.`,
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
