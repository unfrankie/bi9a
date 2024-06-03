let analyzer;
let request;

export const visualizer = (audioElement, canvas, play) => {
    if(!analyzer){
        const AudioCotext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCotext();
        let source = audioCtx.createMediaElementSource(audioElement);
        analyzer = audioCtx.createAnalyser();
        source.connect(analyzer);
        source.connect(audioCtx.destination);
    }
    analyzer.fftSize = 32;
    let bufferLength = analyzer.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    const ctx = canvas.getContext("2d");
    const WIDTH = canvas.width = canvas.clientWidth;
    const HEIGHT = canvas.height = canvas.clientHeight;
    function draw(){
        request = requestAnimationFrame(draw);
        analyzer.getByteTimeDomainData(dataArray);
        ctx.beginPath();
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for(let i = 0; i < bufferLength; i++){
            let v = dataArray[i] / 8;
            ctx.arc(WIDTH/2, HEIGHT/2, Math.abs(90 + v), 0, 2*Math.PI);
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowBlur = 3;
            ctx.strokeStyle = '#FF5733';
            ctx.stroke();
        }
    }
    if(play){
        cancelAnimationFrame(request);
    }else { draw() };
}