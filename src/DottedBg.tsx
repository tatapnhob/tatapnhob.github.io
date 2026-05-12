import { useEffect, useRef } from 'react';


const DottedBg = () => {
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef({x: 0, y: 0});

    useEffect(() => {

        let distance: number = 300;
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        document.addEventListener('mousemove', (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        });
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        
        ctx.fillStyle = 'rgba(255, 0, 0, .2)';
        const animate = (delta: number) => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
        
                for (let x = 0; x < window.innerWidth; x += 36) {
                    for (let y = 0; y < window.innerHeight; y += 36) {
                        let offsetX: number = 0;
                        let offsetY: number = 0;
                        if ((x - mouseRef.current.x) ** 2 + (y - mouseRef.current.y) ** 2 < distance ** 2) {
                            let angle: number = Math.atan2(y - mouseRef.current.y, x - mouseRef.current.x);
                            let strength: number = (distance - Math.sqrt((x - mouseRef.current.x) ** 2 + (y - mouseRef.current.y) ** 2)) / distance * 2.;
                            offsetX = Math.cos(angle) * strength * 10;
                            offsetY = Math.sin(angle) * strength * 10;
                        }
        
                        drawPoint(x + offsetX, y + offsetY);
                    }
                }
                requestAnimationFrame(animate);
            }
        requestAnimationFrame(animate);

    const drawPoint = (x: number, y: number) => {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }
    }, [])

  return (
    <canvas id="bg" ref={canvasRef}></canvas>
  );
}

export default DottedBg;