import { useEffect, useRef } from 'react';


const lerp = (a: number, b: number, t: number) => {
    return a * (1 - t) + b * t;
}

const DottedBg = () => {
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef({x: 0, y: 0});
    const pullPointRef = useRef({x: 0, y: 0});
    const mouseActiveRef = useRef(true);
    const strengthRef = useRef(1);

    useEffect(() => {

        let distance: number = 300;
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        document.addEventListener('mousemove', (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        });
        document.addEventListener('mouseenter', (e) => {
            mouseActiveRef.current = true;
        });
        document.addEventListener('mouseleave', (e) => {
            mouseActiveRef.current = false;
        });
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.fillStyle = 'rgba(255, 0, 0, .2)';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                pullPointRef.current.x = lerp(pullPointRef.current.x, mouseRef.current.x, .1);
                pullPointRef.current.y = lerp(pullPointRef.current.y, mouseRef.current.y, .1);

                if (mouseActiveRef.current) {
                    strengthRef.current = lerp(strengthRef.current, 1, .05);
                }
                else {
                    strengthRef.current = lerp(strengthRef.current, 0, .05);
                }
                
                for (let x = 0; x < canvas.width; x += 36) {
                    for (let y = 0; y < canvas.height; y += 36) {
                        let offsetX: number = 0;
                        let offsetY: number = 0;
                        if ((x - pullPointRef.current.x) ** 2 + (y - pullPointRef.current.y) ** 2 < distance ** 2) {
                            let angle: number = Math.atan2(y - pullPointRef.current.y, x - pullPointRef.current.x);
                            let strength: number = (distance - Math.sqrt((x - pullPointRef.current.x) ** 2 + (y - pullPointRef.current.y) ** 2)) / distance * 2. * strengthRef.current;
                            offsetX = Math.cos(angle) * strength * 10;
                            offsetY = Math.sin(angle) * strength * 10;
                        }
        
                        drawPoint(ctx, x + offsetX, y + offsetY);
                    }
                }
                requestAnimationFrame(animate);
            }
        requestAnimationFrame(animate);

    const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
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