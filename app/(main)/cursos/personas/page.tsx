'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface GroupMembers {
  [key: string]: string[];
}

export default function Page(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [students, setStudents] = useState<string[]>(['Lorenza Angeles Pino', 'Max Chacon Noguera']);
  const [searchResults, setSearchResults] = useState<string[]>(students);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupMembers, setGroupMembers] = useState<GroupMembers>({});
  const [activeGroup, setActiveGroup] = useState<string | null>(null);


  const handleSearch = () => {
    setSearchResults(students.filter((student) => student.includes(searchTerm)));
  };

  const handleAddGroup = () => {
    let newGroupName = `Grupo ${groups.length + 1}`;
    let i = 1;

    while (groups.includes(newGroupName)) {
      i++;
      newGroupName = `Grupo ${groups.length + i}`;
    }

    setGroups([...groups, newGroupName]);
  };

  const handleToggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? null : group);
  };

  const handleRemoveGroup = (index: number) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const handleAddMember = (group: string) => {
    const newMember = prompt('Enter the name of the new member');
    if (newMember) {
      setGroupMembers({
        ...groupMembers,
        [group]: [...(groupMembers[group] || []), newMember],
      });
    }
  };

  const handleRemoveMember = (group: string, index: number) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      const newMembers = [...(groupMembers[group] || [])];
      newMembers.splice(index, 1);
      setGroupMembers({
        ...groupMembers,
        [group]: newMembers,
      });
    }
  };

  return (
    <main>
      <section className="flex flex-col items-start justify-start h-screen" style={{ marginLeft: '30px', marginRight: '30px', marginTop: '30px', marginBottom: '30px' }}>
      <h1 style={{ color: 'black', fontSize: '3em', marginBottom: '30px' }}>Personas</h1>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginBottom: '0' }}>
        <button style={{ 
          color: activeTab === 'Todos' ? 'black' : 'grey', 
          border: '1px solid', 
          borderColor: activeTab === 'Todos' ? 'black' : 'transparent', 
          padding: '10px', 
          fontSize: '1.2em',
          borderBottom: 'none',
          borderRadius: '12px 12px 0 0'
        }} onClick={() => setActiveTab('Todos')}>Todos</button>
        <button style={{ 
          color: activeTab === 'Grupos' ? 'black' : 'grey', 
          border: '1px solid', 
          borderColor: activeTab === 'Grupos' ? 'black' : 'transparent', 
          padding: '10px', 
          fontSize: '1.2em',
          borderBottom: 'none',
          borderRadius: '12px 12px 0 0'
        }} onClick={() => setActiveTab('Grupos')}>Grupos</button>
      </div>
      <hr style={{ width: '100%', borderColor: 'black' }} />
      {activeTab === 'Todos' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
            <h1 style={{ color: 'black', fontSize: '2em', marginRight: '200px',  }}>Integrantes</h1>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <input type="text" placeholder="Nombre..." style={{ marginLeft: '30px', marginRight: '10px' }} onChange={e => setSearchTerm(e.target.value)} />
              <button onClick={handleSearch}>Buscar</button>                           
                <select style={{ marginLeft: '10px' }}>
                  <option>Filtrar por</option>
                  <option value="Profesor">Profesor</option>
                  <option value="Estudiante">Estudiante</option>
                </select>
              </div>
            </div>
            <hr />
            <br />
            <ul style={{marginLeft: '20px'}}>
              {searchResults.map((student, index) => (
                <li key={index}>{student}</li>
              ))}
            </ul>
        </div>
      )}

        {activeTab === 'Grupos' && (
          <div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ color: 'black', fontSize: '2em', marginRight: '600px'}}>Grupos</h1>
              <button 
                onClick={handleAddGroup} 
                style={{ 
                  backgroundColor: 'white', 
                  color: 'black', 
                  borderRadius: '50px', 
                  padding: '5px 15px',
                  border: '0.5px solid black'
                }}
              >
                Agregar Grupo
              </button>
            </div>
            <hr />
            <br />
            {groups.map((group, index) => (
              <div 
                key={index} 
                style={{ 
                  border: '1px solid black', 
                  borderRadius: '5px', 
                  padding: '10px', 
                  marginBottom: '10px', 
                  cursor: 'pointer' 
                }}
                onClick={() => handleToggleGroup(group)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{group}</button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to remove this group?')) {
                        handleRemoveGroup(index);
                      }
                    }}
                    style={{ 
                      border: '1px solid red', 
                      borderRadius: '50px', 
                      padding: '5px 10px', 
                      color: 'red'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
                {activeGroup === group && (
                  <div>
                    <table>
                      <tbody>
                        {(groupMembers[group] || []).map((member, index) => (
                          <tr key={index}>
                            <td style={{ paddingRight: '20px' }}>{member}</td>
                            <td>
                              <button 
                                onClick={(e) => {e.stopPropagation(); handleRemoveMember(group, index);}}
                                style={{ color: 'red' }}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                      <button 
                        onClick={(e) => {e.stopPropagation(); handleAddMember(group);}}
                        style={{ 
                          border: '1px solid black', 
                          borderRadius: '5px', 
                          padding: '5px 10px'
                        }}
                      >
                        Agregar miembro
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

