import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const TtphbFrame = ({ scale = 1, materialColor = 0xff0000, inverse = false, offsetRef = useRef({x: 0, y: 0}) }: { scale?: number, materialColor?: THREE.ColorRepresentation, inverse?: boolean, offsetRef?: RefObject<{x: number, y: number }> }) => {

    const { contextSafe } = useGSAP()

    const cursorFollowRotationRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
    const animRotationRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))

    const onClick = contextSafe(() => {
        // console.log("Clicked!")
        animRotationRef.current.y = Math.PI * (inverse ? -1 : 1)
        gsap.to(animRotationRef.current, {y: 0, duration: .6, ease: "back.out"})
    })
    
    function lerp(a: number, b: number, t: number) {
        return a * (1 - t) + b * t;
    }

    const meshRef = useRef<THREE.Mesh | null>(null)
    
    useFrame((_state, delta) => {
        if (meshRef.current && cursorFollowRotationRef.current) {
            cursorFollowRotationRef.current.x = lerp(cursorFollowRotationRef.current.x, 3 * offsetRef.current.y * (inverse ? -1 : 1), Math.min(Math.max(5 * delta, 0), 1));
            cursorFollowRotationRef.current.y = lerp(cursorFollowRotationRef.current.y, 3 * offsetRef.current.x * (inverse ? -1 : 1), Math.min(Math.max(5 * delta, 0), 1));
        
            meshRef.current.rotation.setFromVector3(new THREE.Vector3().addVectors(animRotationRef.current, cursorFollowRotationRef.current))
        }
        // console.log(meshRef.current?.rotation)
    })

    const { nodes } = useGLTF('/ttphb-frame.glb')

    return (
    <>
        <mesh
        ref={meshRef}
        onPointerDown={onClick}
        geometry={(nodes["Frame"] as THREE.Mesh).geometry}
        scale={[scale, scale, scale]}>
            <meshStandardMaterial color={materialColor} />
        </mesh>
    </>
    )
}
export default TtphbFrame

useGLTF.preload('/ttphb-frame.glb')