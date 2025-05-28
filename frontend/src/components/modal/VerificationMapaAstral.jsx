import React, { useEffect, useState } from "react";
import styles from "../../css/modal/Modal.module.css";
import CitySearch from '../profilePages/CitySearch';
import UpdateUserContent from "../userCRUDComponents/UpdateUserComponent";
import axios from '../../services/api';

import { useCalcularMapaAstral } from "../../hooks/useCalcularMapaAstralNatal";


const VerificationMapaAstral = ({ message, onCancel, userData, setUserData, requiredFields }) => {
  const [missingFields, setMissingFields] = useState([]);
  const [visibleFields, setVisibleFields] = useState([]); // controla os campos mostrados
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { calcularMapa, loading: calculandoMapa, erro, resposta } = useCalcularMapaAstral();

  // Executa só na montagem
  useEffect(() => {
    const fieldsToRequest = requiredFields.filter((field) => !userData[field]);
    setMissingFields(fieldsToRequest);
    setVisibleFields(fieldsToRequest); // <-- define quais inputs aparecem
  }, []); // monta só uma vez

  const isEmpty = (value) => {
    if (typeof value === 'string') return value.trim() === '';
    if (typeof value === 'object' && value !== null) return Object.keys(value).length === 0;
    return value == null;
  };


  const handleConfirm = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const fieldsStillMissing = requiredFields.filter((field) => isEmpty(userData[field]));

    if (fieldsStillMissing.length > 0) {
      console.warn('⛔ Ainda faltam campos:', fieldsStillMissing);
      setMissingFields(fieldsStillMissing);
      setVisibleFields(fieldsStillMissing);
      setLoading(false);
      return;
    }

    console.log('📤 Enviando dados para atualização:', userData);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/auth/update', userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('✅ Resposta do servidor:', response.data);
      setSuccessMessage('Dados atualizados com sucesso!');

      await calcularMapa({
        birthDate: userData.birthDate,
        birthTime: userData.birthTime,
        birthCity: userData.birthCity
      });

      window.location.reload()

    } catch (error) {
      console.error('❌ Erro ao atualizar usuário:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>

        {requiredFields.includes("birthDate") && (
          <UpdateUserContent
            field="birthDate"
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {requiredFields.includes("birthTime") && (
          <UpdateUserContent
            field="birthTime"
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {requiredFields.includes("birthCity") && (
          <div className="mb-3 d-flex align-items-center">
            <i className={`bi bi-globe-americas fs-4 me-2 mt-0 ${styles.nomeInfo}`}></i>
            <p className={`mb-0 mt-0 fw-bold ${styles.nomeInfo}`}>Cidade de Nascimento:</p>
            <div className={`ms-2 ${styles.citySearchWrapper}`}>
              <CitySearch
                selectedValue={userData.birthCity}
                onSelect={(selectedCity) => {
                  console.log("📍 Cidade selecionada:", selectedCity);
                  const formatted = `${selectedCity.nome} - ${selectedCity.uf}`;
                  setUserData((prev) => ({ ...prev, birthCity: formatted }));
                }}
              />
            </div>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button onClick={handleConfirm} className={styles.confirmButton} disabled={loading}>
            {loading ? 'Salvando...' : 'Confirmar'}
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>

        {successMessage && <p className="text-success mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default VerificationMapaAstral;