"""
    crie uma lista de questões com 5 perguntas e 4 possíveis respostas cada.
    cada pergunta deve er apenas uma resposta correta
    Cada resposta correta deve valer 1 ponto
    Esse quiz será de várias capitais do mundo
    questoes de 4 alternativas de a b c d
"""

questions = [
    {
        "question": "Qual é a capital da França?",
        "options": {
            "a": "Londres",
            "b": "Berlim",
            "c": "Paris",
            "d": "Roma"
        },
        "answer": "c"
    },
    {
        "question": "Qual é a capital do Japão?",
        "options": {
            "a": "Tóquio",
            "b": "Pequim",
            "c": "Seul",
            "d": "Bangkok"
        },
        "answer": "a"
    },
    {
        "question": "Qual é a capital do Brasil?",
        "options": {
            "a": "Rio de Janeiro",
            "b": "São Paulo",
            "c": "Brasília",
            "d": "Salvador"
        },
        "answer": "c"
    },
    {
        "question": "Qual é a capital da Austrália?",
        "options": {
            "a": "Sydney",
            "b": "Melbourne",
            "c": "Canberra",
            "d": "Brisbane"
        },
        "answer": "c"
    },
    {
        "question": "Qual é a capital do Canadá?",
        "options": {
            "a": "Toronto",
            "b": "Vancouver",
            "c": "Montreal",
            "d": "Ottawa"
        },
        "answer": "d"
    }
]

# Escreva uma função que recebe a questão e as exibe uma a uma para o usuário.
# Ela retorna a resposta do usuário e valida se a resposta é válida ou se ela é um erro.
# def ask_question(question):
#     # Exibe a pergunta
#     print(question["question"])
#     # Itera sobre as opções e as exibe formatadas
#     for key, value in question["options"].items():
#         print(f"{key}: {value}")
    
#     # Loop para validar a entrada do usuário
#     while True:
#         # Solicita ao usuário que digite a resposta e converte para minúscula
#         answer = input("Digite a letra da resposta correta: ").lower()
#         # Verifica se a resposta está entre as opções disponíveis
#         if answer in question["options"]:
#             # Retorna a resposta válida
#             return answer
#         else:
#             # Exibe mensagem de erro se a resposta for inválida
#             print("Resposta inválida. Por favor, tente novamente.")

"""
    Reescreva a função ask_question para se o usuário não responder em 10 segundos, a função deve retornar,
    indicando que o tempo acabou.
    Usando a biblioteca trheading, você pode criar um thread que conta 10 segundos e, se o usuário não responder,
    a thread interrompe a execução da funação
"""
import threading
def ask_question(question):
    # Exibe a pergunta
    print(question["question"])
    # Itera sobre as opções e as exibe formatadas
    for key, value in question["options"].items():
        print(f"{key}: {value}")
    
    # Variável para armazenar a resposta do usuário
    user_answer = None
    
    # Função para contar o tempo e interromper a entrada do usuário após 10 segundos
    def timeout():
        nonlocal user_answer
        print("\nTempo esgotado! Você não respondeu a tempo.")
        user_answer = "timeout"  # Define a resposta como "timeout" para indicar que o tempo acabou
    
    # Cria um thread para contar o tempo
    timer_thread = threading.Timer(10.0, timeout)
    timer_thread.start()
    
    # Loop para validar a entrada do usuário
    while user_answer is None:
        # Solicita ao usuário que digite a resposta e converte para minúscula
        answer = input("Digite a letra da resposta correta: ").lower()
        # Verifica se a resposta está entre as opções disponíveis
        if answer in question["options"]:
            user_answer = answer  # Define a resposta do usuário como válida
            timer_thread.cancel()  # Cancela o timer se o usuário responder a tempo
        else:
            print("Resposta inválida. Por favor, tente novamente.")
    
    return user_answer


# Escreva uma função que recebe a resposta do usuário e a compara com a resposta correta.
def check_answer(user_answer, correct_answer):
    # Compara a resposta do usuário com a resposta correta
    return user_answer == correct_answer

def main():
    score = 0
    # Itera sobre cada questão na lista de questões
    for question in questions:
        # Chama a função para exibir a questão e obter a resposta do usuário
        user_answer = ask_question(question)
        # Verifica se a resposta do usuário está correta
        if check_answer(user_answer, question["answer"]):
            print("Resposta correta!")
            score += 1  # Incrementa a pontuação em 1 ponto para cada resposta correta
        else:
            print("Resposta incorreta. a resposta correta é:", question["options"][question["answer"]])
    
    """
        Adicione um sistema de feedback para o usuário ao final do quiz
        Por exemplo:
        Entre 0 a 30 por cento: "Você precisa estudar mais!"
        Entre 30 a 70 por cento: "Bom trabalho, mas você pode melhorar!"
        Entre 70 a 100 por cento: "Parabens, você foi muito bem!"
    """
    provide_feedback(score)
    
    # Exibe a pontuação final do usuário
    print(f"Sua pontuação final é: {score}/{len(questions)}")

def provide_feedback(score):
    percentage = (score / len(questions)) * 100
    if percentage < 30:
        print("Você precisa estudar mais!")
    elif percentage < 70:
        print("Bom trabalho, mas você pode melhorar!")
    else:
        print("Parabéns, você foi muito bem!")


if __name__ == "__main__":
    main()