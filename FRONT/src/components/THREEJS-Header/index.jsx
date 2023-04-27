import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import './styles.scss';
import Experience from './Experience';
import Cube from './Cube';
import Sphere from './Sphere';

function ThreeScene() {
    const containerRef = useRef(null);

    function onWindowResize(camera, renderer) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }

    useEffect(() => {
        const { camera, gl } = containerRef.current;

        function handleResize() {
            onWindowResize(camera, gl);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="scene__container" style={{ maxWidth: '100vw' }}>
            <div ref={containerRef} className='scene'>
                <Canvas style={{ position: 'absolute', width: '40%', top: -240, left: '30%' }} shadows camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [- 4, 3, 35]
                }}>
                    <ambientLight intensity={1.0} />
                    <directionalLight
                        color={0xffffff}
                        position={[0, 2, 0]}
                        castShadow={true}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        shadow-radius={5}
                        shadow-bias={-0.0001}
                    />

                    <mesh receiveShadow>
                        <planeGeometry args={[10, 10]} />
                        <shadowMaterial opacity={0.5} />
                    </mesh>
                    {/* <Experience /> */}
                    <Cube position={[0, 0, 0]} />
                    <Sphere position={[2, 0, 0]} />
                </Canvas>
            </div>
        </div>
    )
}

export default ThreeScene;

