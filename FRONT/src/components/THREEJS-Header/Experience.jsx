import { OrbitControls } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useRef } from 'react';

export default function Experience() {
    const model = useLoader(GLTFLoader, './chichacentrée.glb')
    const cameraRef = useRef();
    // console.log("la cam", cameraRef)

    useEffect(() => {
        if (cameraRef && cameraRef.current) {
            cameraRef.current.lookAt(model.scene.position);
        }
    }, [model]);

    return <>
        <OrbitControls makeDefault />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />
        <primitive object={model.scene} scale={1} position={[0, -5, 0
        ]} />
    </>
}