import { useState } from "react";
import styles from "../../css/modal/DeleteModal.module.css"
import axios from '../../services/api.js';
/*
  Componente DeleteModal:
  Exibe uma janela modal para o usuário inserir a senha e confirmar a exclusão.
  Recebe três props:
    - isOpen: Booleano que indica se o modal deve estar visível.
    - onClose: Função para fechar o modal.
    - onConfirm: Função de callback que recebe o resultado da verificação da senha (true/false).
*/

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    // Estado para armazenar o valor da senha digitada pelo usuário
    const [password, setPassword] = useState("");
    // Estado para controlar o indicador de "loading" durante a requisição
    const [loading, setLoading] = useState("");
    // Estado para armazenar mensagens de erro, se houver
    const [error, setError] = useState("");

      const [username, setUsername] = useState("");

    // Se isOpen for false, o modal não é renderizado
    if (!isOpen) return null;

    /*
    Função handleSubmit:
    Responsável por enviar a senha para o backend e realizar a verificação.
    Durante o processo, exibe um estado de carregamento e trata possíveis erros.
    */
    const handleSubmit = async (e) =>  {
        // Inicia o loading e limpa mensagens de erro anteriores
        setLoading(true);
        setError("");

        e.preventDefault();
  
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
            });
          
            const data = await response.json();
            console.log("Resposta da validação:", data);
          
            if (response.ok) { // Correto!
              console.log("Senha validada com sucesso no backend");
              onConfirm(true);
              onClose();
            } else {
              console.log("Senha incorreta, de acordo com o backend");
              setError("Senha incorreta.");
              onConfirm(false);
            }
          } catch (err) {
            //você pode chamar o error de err ou até mesmo de e
            // Em caso de erro na requisição, define uma mensagem de erro e retorna "false"
            setError("Erro ao validar senha.");
            onConfirm(false);
        } finally {
            //Após o término da requisição, desliga o loading e limpa o campo de senha
            setLoading(false);
            setPassword("");
        }
    };


    return (
        // A camada de overlay do modal, que bloqueia a interação com o fundo da página
        <div className={styles.modalOverlay}>
            {/* Conteúdo principamodalContentl do modal */}
            <div className={styles.modalContent}>
                <h2>Confirmação de Exclusão</h2>
                <p>Digite seu nome de usuário e senha de administrador(a) para confirmar:</p>
                <input
                    type="text"
                    id="username"
                    className={styles.inputPassword}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {/* Campo de entrada da senha, controlado pelo estado "password" */}
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className={styles.inputPassword}
                />
                {/* Exibe a mensagem de erro caso exista */}
                {error && <p className={styles.errorMessage}>{error}</p>}
                {/* Grupo de botões para confirmar ou cancelar */}
                <div className={styles.buttonGroup}>
                    <button onClick={handleSubmit} disabled={loading}>
                        {/* Exibe "Verificando..." enquanto a requisição está em andamento */}
                        {loading ? "Verificando..." : "Confirmar"}
                    </button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;