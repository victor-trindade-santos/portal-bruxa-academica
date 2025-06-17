import React, { useState } from 'react';
import axios from 'axios';
import UpdateModal from '../modal/ArticleModal'; // Reutilizando seu modal
import styles from '../../css/articleCRUDComponents/ArticleCRUDComponent.module.css';
import CitySearch from '../profilePages/CitySearch';

const UpdateUserContent = ({ field, userData, setUserData }) => {
if (!userData) {
    console.log('⚠️ userData está indefinido ou nulo, não será renderizado.');
    return null;
}

const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const handleOpenModal = () => {
    console.log('🟡 Abrindo modal para atualização de dados do usuário...');
    setShowModal(true);
};

const handleCancel = () => {
    console.log('🔴 Atualização de dados cancelada.');
    setShowModal(false);
};

const handleConfirm = async () => {
    console.log('📤 Enviando dados para atualização...');
    setShowModal(false);
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
        const token = localStorage.getItem('token');
        console.log('🛡️ Token recuperado do localStorage:', token);

        console.log('📦 Dados enviados para atualização:', userData);

        const response = await axios.put('/auth/update', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('✅ Resposta do servidor:', response.data);
        setSuccessMessage('Dados atualizados com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao atualizar usuário:', error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || 'Erro ao atualizar usuário');
    } finally {
        setLoading(false);
        console.log('⏹️ Finalizando processo de atualização. loading:', loading);
    }
};

const handleChange = (key, value) => {
    console.log(`✏️ Alterando campo '${key}' para:`, value);
    setUserData(prev => {
        const updated = {
            ...prev,
            [key]: value
        };
        console.log('📝 Novo estado userData:', updated);
        return updated;
    });
};


    return (
<div className="mb-3 d-flex align-items-center" style={{ justifyContent: 'space-between' }}>
  {/* Grupo da Legenda */}
<div className="d-flex align-items-center label-group">
  {field === 'birthDate' && <i className="bi bi-stars fs-4 me-2 mt-0"></i>}
  {field === 'birthTime' && <i className="bi bi-wind fs-4 me-2 mt-0"></i>}
  {field === 'birthCity' && <i className="bi bi-globe-americas fs-4 me-2 mt-0"></i>}

  {field === 'birthDate' && <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Data de Nascimento:</p>}
  {field === 'birthTime' && <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Horário de Nascimento:</p>}
  {field === 'birthCity' && <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Cidade de Nascimento:</p>

}
</div>


  {/* Input/Componente */}
  <div> {/* Este wrapper é opcional se o input/CitySearch já se comporta bem */}
    {field === 'birthDate' && (
      <input
        type="date"
        className={styles.input} // Não precisa mais de margin-left: auto aqui
        value={userData.birthDate || ''}
        onChange={(e) => handleChange('birthDate', e.target.value)}
      />
    )}
    {field === 'birthTime' && (
      <input
        type="time"
        className={styles.input} // Não precisa mais de margin-left: auto aqui
        value={userData.birthTime || ''}
        onChange={(e) => handleChange('birthTime', e.target.value)}
      />
    )}
    {field === 'birthCity' && (
      <CitySearch
        onSelectCity={(cidade) => handleChange('birthCity', cidade)}
      />
    )}
  </div>

            {field === 'email' && (
                <>
                    <i className="bi bi-envelope fs-4 me-2 mt-0"></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Email:</p>
                    <input
                        type="email"
                        className={styles.input}
                        value={userData.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </>
            )}

            {field === 'password' && (
                <>
                    <i className="bi bi-lock fs-4 me-2 mt-0"></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Senha:</p>
                    <input
                        type="password"
                        className={styles.input}
                        value={userData.password || ''}
                        onChange={(e) => handleChange('password', e.target.value)}
                    />
                </>
            )}

            {field === 'username' && (
                <>
                    <i className="bi bi-person fs-4 me-2 mt-0"></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Usuário:</p>
                    <input
                        type="text"
                        className={styles.input}
                        value={userData.username || ''}
                        onChange={(e) => handleChange('username', e.target.value)}
                    />
                </>
            )}

            {field === 'fullname' && (
                <>
                    <i className="bi bi-person-badge fs-4 me-2 mt-0"></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Nome completo:</p>
                    <input
                        type="text"
                        className={styles.input}
                        value={userData.fullname || ''}
                        onChange={(e) => handleChange('fullname', e.target.value)}
                    />
                </>
            )}

            {loading && <span className="ms-2">Salvando...</span>}
            {successMessage && <span className="ms-2 text-success">{successMessage}</span>}
            {errorMessage && <span className="ms-2 text-danger">{errorMessage}</span>}

            {showModal && (
                <UpdateModal
                    message="Deseja confirmar a atualização dos dados?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default UpdateUserContent;
