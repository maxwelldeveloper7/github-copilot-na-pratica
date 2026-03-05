import pytest
from quiz import questions, check_answer, ask_question
from unittest.mock import patch
import io

class TestQuestions:
    """Testa a estrutura das questões"""
    
    def test_questions_length(self):
        """Verifica se há 5 questões"""
        assert len(questions) == 5
    
    def test_question_has_required_fields(self):
        """Verifica se cada questão tem os campos obrigatórios"""
        for question in questions:
            assert "question" in question
            assert "options" in question
            assert "answer" in question
    
    def test_question_has_four_options(self):
        """Verifica se cada questão tem 4 opções"""
        for question in questions:
            assert len(question["options"]) == 4
    
    def test_options_have_correct_keys(self):
        """Verifica se as opções usam as letras a, b, c, d"""
        for question in questions:
            expected_keys = {"a", "b", "c", "d"}
            assert set(question["options"].keys()) == expected_keys
    
    def test_answer_is_valid_option(self):
        """Verifica se a resposta correta é uma das opções"""
        for question in questions:
            assert question["answer"] in question["options"]


class TestCheckAnswer:
    """Testa a function check_answer"""
    
    def test_correct_answer(self):
        """Verifica se a resposta correta é identificada"""
        assert check_answer("c", "c") is True
    
    def test_incorrect_answer(self):
        """Verifica se a resposta incorreta é identificada"""
        assert check_answer("a", "c") is False
    
    def test_different_options(self):
        """Testa todas as combinações de respostas"""
        options = ["a", "b", "c", "d"]
        for option in options:
            assert check_answer(option, option) is True
            for wrong in options:
                if wrong != option:
                    assert check_answer(wrong, option) is False


class TestAskQuestion:
    """Testa a function ask_question"""
    
    @patch('builtins.input', return_value='c')
    def test_ask_question_valid_answer(self, mock_input):
        """Testa se a função retorna a resposta correta do usuário"""
        question = questions[0]
        result = ask_question(question)
        assert result == "c"
    
    @patch('builtins.input', side_effect=['x', 'y', 'a'])
    def test_ask_question_invalid_then_valid(self, mock_input):
        """Testa se a função aceita respostas inválidas antes da válida"""
        question = questions[0]
        result = ask_question(question)
        assert result == "a"
    
    @patch('builtins.input', return_value='A')
    def test_ask_question_uppercase_input(self, mock_input):
        """Testa se a função converte a entrada para minúscula"""
        question = questions[0]
        result = ask_question(question)
        assert result == "a"
    
    @patch('builtins.input', side_effect=['invalid', 'b'])
    def test_ask_question_handles_invalid_input(self, mock_input):
        """Testa se a função lida com inputs inválidos"""
        question = questions[0]
        result = ask_question(question)
        assert result == "b"

if __name__ == "__main__":
    pytest.main()