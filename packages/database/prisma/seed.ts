// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { prismaClientOptions } from './prisma.config.ts';

const prisma = new PrismaClient(prismaClientOptions);

type Diff = 'Iniciante' | 'Intermediário' | 'Avançado';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function randFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('Iniciando a semeadura do banco de dados...');

  // Gerar 300 exercícios programaticamente
  const exercises: any[] = [];
  let idCounter = 1;

  const groups = [
    { name: 'Peito', muscleGroups: ['Peito'], count: 60 },
    { name: 'Costas', muscleGroups: ['Costas'], count: 60 },
    { name: 'Pernas', muscleGroups: ['Pernas'], count: 50 },
    { name: 'Ombros', muscleGroups: ['Ombros'], count: 40 },
    { name: 'Braços', muscleGroups: ['Braços'], count: 40 },
    { name: 'Core', muscleGroups: ['Core'], count: 50 },
  ];

  const diffPool: Diff[] = ['Iniciante', 'Intermediário', 'Avançado'];
  const techniquePool = [
    'Rest-Pause', 'Drop Set', 'Myo-Reps', 'Cluster Set',
    'Mind-Muscle Connection', 'Controlled Eccentric', 'Isometric Hold'
  ];

  for (const g of groups) {
    for (let i = 0; i < g.count; i++) {
      const diff = randFrom(diffPool);
      const rest =
        diff === 'Iniciante'
          ? 150 + Math.floor(Math.random() * 60)
          : diff === 'Intermediário'
          ? 105 + Math.floor(Math.random() * 30)
          : 75 + Math.floor(Math.random() * 25);

      const tech = randFrom(techniquePool);
      const name = `${g.name} Ex ${i + 1}`;

      const ex = {
        id: `ex${String(idCounter).padStart(3, '0')}`,
        name,
        slug: slugify(name),
        muscleGroups: g.muscleGroups,
        secondaryMuscles: randFrom([[], ['Ombros'], ['Tríceps'], ['Bíceps']]),
        equipment: randFrom(['Barra', 'Halteres', 'Máquinas', 'Banco', 'Peso Corporal', 'Elásticos']),
        difficulty: diff,
        exerciseType: randFrom(['Força', 'Estabilização', 'Isolamento', 'HIIT/Condicionamento']),
        instructions: `Instruções detalhadas para ${name}.`,
        executionSteps: [
          `Passo 1: Preparação para ${g.name}`,
          'Passo 2: Execução com controle',
          'Passo 3: Retorno à posição neutra',
        ],
        tempo: '3-1-2-1',
        tips: ['Dica 1', 'Dica 2', 'Dica 3'],
        commonMistakes: ['Falha comum 1', 'Falha comum 2'],
        safetyNotes: ['Atenção à forma', 'Não exceda a amplitude'],
        videoUrl: `https://example.com/videos/${slugify(name)}.mp4`,
        videoTitle: `${name} - Técnica correta`,
        videoDescription: `Descrição do exercício ${name}`,
        videoDuration: 60 + Math.floor(Math.random() * 60),
        restTime: rest,
        pacholokTechnique: tech,
      };

      exercises.push(ex);
      idCounter++;
    }
  }

  // Garantir exatamente 300 exercícios (se exceder, corta)
  const toInsert = exercises.slice(0, 300);

  await prisma.exercise.createMany({ data: toInsert, skipDuplicates: true });
  console.log(`Adicionados ${toInsert.length} exercícios.`);

  // Criar 15 programas simples
  const programs: any[] = [];
  const templates = [
    { title: 'Seca Barriga ABC', duration: 24, equipment: 'Academia Completa', environment: 'Gym', weeklySplit: 'ABC' },
    { title: 'Empina Bumbum (Home)', duration: 12, equipment: 'Peso Corporal', environment: 'Home', weeklySplit: 'ABD' },
    { title: 'Mobilidade + Força', duration: 12, equipment: 'Elásticos + Peso Corporal', environment: 'Hybrid', weeklySplit: 'AB' },
    { title: 'Treino ABC Pro', duration: 24, equipment: 'Academia Completa', environment: 'Gym', weeklySplit: 'ABC' },
  ];

  for (let idx = 0; idx < 15; idx++) {
    const t = templates[idx % templates.length];
    programs.push({
      id: `prog${(idx + 1).toString().padStart(3, '0')}`,
      title: t.title,
      description: 'Programa gerado automaticamente para seed.',
      duration: t.duration,
      difficulty: 'Intermediário',
      gender: 'Unisex',
      level: 'Intermediate',
      weeklySplit: t.weeklySplit,
      progression: 'Phased',
      weeklyStructure: {
        phase1: { description: 'Fase 1: Técnica e volume moderado', days: ['Dia A', 'Dia B', 'Dia C'], details: {} },
        phase2: { description: 'Fase 2: Intensidade', days: ['Dia A', 'Dia B', 'Dia C'], details: {} },
        phase3: { description: 'Fase 3: Alto Volume', days: ['Dia A', 'Dia B', 'Dia C'], details: {} },
        phase4: { description: 'Fase 4: Pico', days: ['Dia A', 'Dia B', 'Dia C'], details: {} },
      },
      equipmentRequired: t.equipment,
      environment: t.environment,
      phase1: { description: 'Fase 1: Adaptação', weeks: [{ week: 1, focus: 'Técnica' }], exercisesPerDay: { 'Dia A': 4, 'Dia B': 4, 'Dia C': 4 }, baseReps: '8-12', baseSets: 3, baseRest: 90 },
      phase2: { description: 'Fase 2: Intensidade', weeks: [{ week: 7, focus: 'Rest-Pause' }], exercisesPerDay: { 'Dia A': 4, 'Dia B': 4, 'Dia C': 4 }, baseReps: '6-12', baseSets: 4, baseRest: 75 },
      phase3: { description: 'Fase 3: Alto Volume', weeks: [{ week: 13, focus: 'Drop Sets' }], exercisesPerDay: { 'Dia A': 5, 'Dia B': 5, 'Dia C': 5 }, baseReps: '8-15', baseSets: 4, baseRest: 60 },
      phase4: { description: 'Fase 4: Pico', weeks: [{ week: 19, focus: 'Cluster Sets' }], exercisesPerDay: { 'Dia A': 5, 'Dia B': 5, 'Dia C': 5 }, baseReps: '6-10', baseSets: 4, baseRest: 60 },
    });
  }

  await prisma.program.createMany({ data: programs, skipDuplicates: true });
  console.log(`Adicionados ${programs.length} programas.`);

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });