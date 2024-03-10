'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// La estructura deberia ser:
//
//  PROFESOR
//    |
//    |- <NOMBRE PROFESOR>
//    |
//  ESTUDIANTES
//    |
//    |- <NOMBRE ESTUDIANTE 1>
//    |- <NOMBRE ESTUDIANTE 2>
//    |- <NOMBRE ESTUDIANTE 3>
//    ...


export default function Page(): JSX.Element {
  const [activeTab, setActiveTab] = useState('Todos');

  return (
    <main>
      <section className="flex flex-col items-start justify-start h-screen" style={{ marginLeft: '20px' }}>
        <h1 style={{ color: 'black', fontSize: '2em' }}>Personas</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginBottom: '20px' }}>
          <button style={{ color: activeTab === 'Todos' ? 'black' : 'grey', border: '1px solid', borderColor: activeTab === 'Todos' ? 'black' : 'transparent', padding: '10px', fontSize: '1.2em' }} onClick={() => setActiveTab('Todos')}>Todos</button>
          <button style={{ color: activeTab === 'Grupos' ? 'black' : 'grey', border: '1px solid', borderColor: activeTab === 'Grupos' ? 'black' : 'transparent', padding: '10px', fontSize: '1.2em' }} onClick={() => setActiveTab('Grupos')}>Grupos</button>
        </div>

        {activeTab === 'Todos' && (
          <div>
            <h1 style={{ color: 'black', fontSize: '2em' }}>Profesor</h1>
            <hr />
            <p>PLACEHOLDER Nombre del profesor</p>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ color: 'black', fontSize: '2em', marginRight: '20px' }}>Estudiantes</h1>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <input type="text" placeholder="Buscar..." style={{ marginRight: '10px' }} />
                <button>Buscar</button>
                <select style={{ marginLeft: '10px' }}>
                  <option>Filtrar por</option>
                </select>
              </div>
            </div>
            <hr />
            <ul>
              <li>Estudiante 1</li>
              <li>Estudiante 2</li>
              <li>Estudiante 3</li>
            </ul>
          </div>
        )}

        {activeTab === 'Grupos' && (
          <div>
            <h1 style={{ color: 'black', fontSize: '2em' }}>Grupos</h1>
            <hr />
            <ul>
              <li>Grupo 1</li>
              <li>Grupo 2</li>
              <li>Grupo 3</li>
            </ul>
          </div>
        )}
        <br></br>

        <Link href="/cursos" passHref>
          <Button className="mt-4">Regresar a cursos</Button>
        </Link>
      </section>
    </main>
  );
}
