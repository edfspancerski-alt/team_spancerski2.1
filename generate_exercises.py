import json

categories = {
    "peito": [
        "Supino Reto com Barra", "Supino Inclinado com Halteres", "Supino Declinado", "Flexão de Braços",
        "Crucifixo Reto", "Crucifixo Inclinado", "Crossover Cabo Alto", "Crossover Cabo Baixo",
        "Peck Deck", "Flexão Diamante", "Supino na Máquina", "Dips (Paralelas)", "Pullover com Haltere",
        "Crucifixo no Cabo", "Supino com Pegada Fechada", "Flexão com Joelhos", "Supino Articulado",
        "Flexão Explosiva", "Abertura de Peito com Elástico", "Crucifixo Inclinado no Cabo"
    ],
    "costas": [
        "Puxada Frontal", "Remada Curvada com Barra", "Barra Fixa", "Remada Baixa com Triângulo",
        "Levantamento Terra", "Puxada com Pegada Inversa", "Remada Unilateral com Haltere",
        "Lombar (Superman)", "Puxada com Braços Estendidos", "Remada Cavalinho", "Barra Fixa Supinada",
        "Remada na Máquina", "Puxada na Nuca", "Good Morning", "Remada Curvada com Halteres",
        "Remada Alta com Barra", "Encolhimento de Ombros", "Face Pull", "Puxada Triângulo", "Remada Articulada"
    ],
    "quadríceps": [
        "Agachamento Livre", "Leg Press 45", "Cadeira Extensora", "Afundo com Halteres",
        "Agachamento Hack", "Agachamento Sumô", "Sissy Squat", "Agachamento Frontal",
        "Passada (Lunge)", "Agachamento Búlgaro", "Leg Press Horizontal", "Agachamento com Salto",
        "Subida no Banco (Step-up)", "Agachamento Goblet", "Agachamento na Parede (Wall Sit)",
        "Agachamento com Elástico", "Pistol Squat", "Agachamento com Barra T"
    ],
    "posterior_gluteos": [
        "Mesa Flexora", "Stiff com Barra", "Elevação Pélvica", "Cadeira Abdutora",
        "Cadeira Adutora", "Cadeira Flexora", "Glúteo no Cabo", "Flexão de Pernas Sentado",
        "Bom Dia (Good Morning)", "Levantamento Terra Romeno", "Glúteo Máquina",
        "Abdução de Quadril Deitado", "Ponte de Glúteo", "Kettlebell Swing", "Extensão de Quadril",
        "Stiff com Halteres", "Flexão de Pernas Unilateral", "Mesa Flexora Horizontal"
    ],
    "ombros": [
        "Desenvolvimento com Halteres", "Elevação Lateral", "Elevação Frontal", "Crucifixo Inverso",
        "Desenvolvimento Militar", "Desenvolvimento Arnold", "Elevação Lateral no Cabo",
        "Remada Alta", "Desenvolvimento na Máquina", "Elevação Lateral Inclinado",
        "Desenvolvimento com Barra por Trás", "Elevação Frontal com Anilhas", "Face Pull no Cabo",
        "Elevação Lateral Unilateral", "Desenvolvimento Clean and Press", "Y-Raise"
    ],
    "braços": [
        "Rosca Direta com Barra", "Rosca Martelo", "Tríceps Pulley", "Tríceps Testa",
        "Rosca Concentrada", "Rosca Scott", "Tríceps Corda", "Tríceps Coice",
        "Rosca Inversa", "Rosca 21", "Tríceps Francês", "Mergulho no Banco",
        "Rosca com Halteres Inclinado", "Tríceps Supino", "Rosca Alternada",
        "Tríceps Extensão Unilateral", "Rosca Unilateral no Cabo", "Tríceps Coice no Cabo"
    ],
    "core": [
        "Prancha Isométrica", "Crunch Abdominal", "Elevação de Pernas", "Abdominal Bicicleta",
        "Prancha Lateral", "Abdominal Canivete", "Roda Abdominal", "Russian Twist",
        "Abdominal Infra no Banco", "Mountain Climber", "Hollow Hold", "V-Ups",
        "Prancha com Toque no Ombro", "Abdominal Obliquo", "Dead Bug", "Bird Dog",
        "Abdominal na Polia", "Elevação de Quadril"
    ],
    "cardio": [
        "Polichinelo", "Burpee", "Corrida Estacionária", "Salto em Altura",
        "Corda Naval", "Pular Corda", "Escalada (Mountain Climbers)", "Shadow Boxing",
        "Sprint no Lugar", "Jumping Jacks", "Skater Jumps", "Box Jumps",
        "High Knees", "Butt Kicks", "Lateral Shuffles", "Bear Crawl"
    ]
}

equipments = ["barra", "halteres", "máquina", "cabos", "nenhum", "elástico", "kettlebell"]
difficulties = ["iniciante", "intermediário", "avançado"]

exercises_list = []

for cat, items in categories.items():
    for item in items:
        # Determine likely equipment and difficulty based on common knowledge
        eq = "nenhum"
        if "Barra" in item: eq = "barra"
        elif "Haltere" in item or "Alternada" in item or "Arnold" in item: eq = "halteres"
        elif "Máquina" in item or "Cadeira" in item or "Mesa" in item or "Press" in item or "Pulley" in item or "Puxada" in item or "Deck" in item: eq = "máquina"
        elif "Cabo" in item or "Polia" in item or "Crossover" in item: eq = "cabos"
        elif "Elástico" in item: eq = "elástico"
        elif "Kettlebell" in item: eq = "kettlebell"

        diff = "intermediário"
        if any(x in item for x in ["Flexão", "Prancha", "Crunch", "Puxada Frontal", "Cadeira"]): diff = "iniciante"
        if any(x in item for x in ["Barra Fixa", "Terra", "Pistol", "Burpee", "Avançado"]): diff = "avançado"

        exercises_list.append({
            "name": item,
            "muscles": [cat.replace("_", " ")],
            "equipment": eq,
            "difficulty": diff,
            "instructions": f"Execute o movimento de {item} focando na contração muscular e controle do ritmo.",
            "demoUrl": f"https://cdn.fitnessapp/videos/{item.lower().replace(' ', '-')}.mp4"
        })

print(json.dumps(exercises_list, ensure_ascii=False, indent=2))
