import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

function Sphere(props) {
    const meshRef = useRef();
    const [velocity, setVelocity] = useState([0, 0, 0]);
    const gravity = 0.01;

    useFrame(() => {
        meshRef.current.position.y += velocity[1];

        if (meshRef.current.position.y <= -5) {
            const newVelocity = [velocity[0], -velocity[1], velocity[2]];
            setVelocity(newVelocity);
        } else {
            const newVelocity = [
                velocity[0],
                velocity[1] - gravity,
                velocity[2],
            ];
            setVelocity(newVelocity);
        }
    });

    return (
        <mesh {...props} ref={meshRef} position={[0, -3, 0]}>
            <sphereBufferGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={'#91902b'} emissive={'orange'} emissiveIntensity={2} />
        </mesh>
    );
}

export default Sphere;
