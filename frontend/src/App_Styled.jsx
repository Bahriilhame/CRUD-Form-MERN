import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

const AppStyled = () => {
  const [stgInfos, setStgInfos] = useState([]);
  const [Id, setId] = useState('');
  const [stgInfo, setStgInfo] = useState({
    nom: '',
    prenom: '',
    age: '',
    adresse: '',
    genre: '',
    niveau: '',
    groupe: '',
    anneeScolaire: '',
  });
  
  const fetchInfos = async () => {
    const response = await axios.get('http://localhost:8080/');
    setStgInfos(response.data);
  };

  useEffect(() => {
    fetchInfos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStgInfo({ ...stgInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (Id) {
        await axios.put('http://localhost:8080/update', { _id: Id, ...stgInfo });
        setId('');
      } else {
        await axios.post('http://localhost:8080/create', stgInfo);
      }
      setStgInfo({
        nom: '',
        prenom: '',
        age: '',
        adresse: '',
        genre: '',
        niveau: '',
        groupe: '',
        anneeScolaire: '',
      });
      fetchInfos();
  };

  const handleUpdate = (id) => {
    const stgEdited = stgInfos.find((infos) => infos._id === id);
    setId(id);
    setStgInfo({ ...stgEdited });
  };

  const handleDelete = async (id) => {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      fetchInfos();
  };

  return (
    <div>
      <h1 style={{ textAlign:'center',color:'rgb(80, 194, 255)',margin:'3px' }}>Gestion des Stagiaires</h1>
      <div style={{border:'1px solid gray',borderRadius:'10px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: 'auto', padding: '20px', display: 'flex' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            marginRight: '20px',
          }}
        >
          <label style={{ display: 'block', margin: '2px 0' }}>
            Nom:
            <input
              type="text"
              name="nom"
              value={stgInfo.nom}
              onChange={handleChange}
              style={{
                marginLeft: '10px',
                padding: '3px',
                borderRadius: '4px',
                width: '90%',
              }}
            />
          </label>
          <br />
          <label style={{ display: 'block', margin: '2px 0' }}>
            Prénom:
            <input
              type="text"
              name="prenom"
              value={stgInfo.prenom}
              onChange={handleChange}
              style={{
                marginLeft: '10px',
                padding: '3px',
                borderRadius: '4px',
                width: '90%',
              }}
            />
          </label>
          <br />
          <label style={{ display: 'block', margin: '2px 0' }}>
            Âge:
            <input
              type="number"
              name="age"
              value={stgInfo.age}
              onChange={handleChange}
              style={{
                marginLeft: '10px',
                padding: '3px',
                borderRadius: '4px',
                width: '90%',
              }}
            />
          </label>
          <br />
          <label style={{ display: 'block', margin: '2px 0' }}>
            Adresse:
            <input
              type="text"
              name="adresse"
              value={stgInfo.adresse}
              onChange={handleChange}
              style={{
                marginLeft: '10px',
                padding: '3px',
                borderRadius: '4px',
                width: '90%',
              }}
            />
          </label>
          <br />
          <button
            style={{
              backgroundColor: 'rgb(77, 238, 153)',
              cursor: 'pointer',
              margin: '4px',
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              color: '#fff',
              fontSize: '16px',
              alignSelf: 'flex-end',
            }}
            type="submit"
          >
            {Id ? 'Update' : 'Add'}
          </button>
        </form>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <label style={{ display: 'block', margin: '2px 0' }}>
            Genre:
            <div style={{ marginLeft: '10px', marginTop: '5px' }}>
              <label style={{ marginRight: '20px' }}>
                <input
                  type="radio"
                  name="genre"
                  value="Féminin"
                  checked={stgInfo.genre === 'Féminin'}
                  onChange={handleChange}
                />
                Féminin
              </label>
              <label>
                <input
                  type="radio"
                  name="genre"
                  value="Masculin"
                  checked={stgInfo.genre === 'Masculin'}
                  onChange={handleChange}
                />
                Masculin
              </label>
            </div>
          </label>
          <br />
          <label style={{ display: 'block', margin: '2px 0' }}>
            Niveau:
            <input
              type="text"
              name="niveau"
              value={stgInfo.niveau}
              onChange={handleChange}
              style={{
                marginLeft: '10px',
                padding: '3px',
                borderRadius: '4px',
                width: '90%',
              }}
            />
          </label>
          <br />
          <label style={{ display: 'block', margin: '2px 0' }}>
            Groupe:
            <input
              type="text"
              name="groupe"
              value={stgInfo.groupe}
              onChange={handleChange}
              style={{
                marginLeft: '10px',
                padding: '3px',
                borderRadius: '4px',
                width: '90%',
              }}
            />
          </label>
          <br />
          <label style={{ display: 'block', margin: '2px 0' }}>
            Année Scolaire:
            <input
              type="text"
              name="anneeScolaire"
              value={stgInfo.anneeScolaire}
              onChange={handleChange}
              style={{
                marginLeft: '10px',
                padding: '3px',
                borderRadius: '4px',
                width: '90%',
              }}
            />
          </label>
        </div>
      </div>

      <table className="styled-table" width={'90%'}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Âge</th>
            <th>Adresse</th>
            <th>Genre</th>
            <th>Niveau</th>
            <th>Groupe</th>
            <th>Année Scolaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stgInfos.map((data) => (
            <tr key={data._id}>
              <td>{data.nom}</td>
              <td>{data.prenom}</td>
              <td>{data.age}</td>
              <td>{data.adresse}</td>
              <td>{data.genre}</td>
              <td>{data.niveau}</td>
              <td>{data.groupe}</td>
              <td>{data.anneeScolaire}</td>
              <td>
                <button className="edit-button" onClick={() => handleUpdate(data._id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppStyled;
  