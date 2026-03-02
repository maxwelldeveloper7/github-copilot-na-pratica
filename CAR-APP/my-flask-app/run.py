from flask import Flask
# Supondo que o seu Blueprint esteja em um arquivo chamado routes.py
from app.route import main

app = Flask(__name__)

# Registra o blueprint para que as rotas funcionem
app.register_blueprint(main)

if __name__ == "__main__":
    # Rodando em modo debug para facilitar o desenvolvimento
    app.run(debug=True)
