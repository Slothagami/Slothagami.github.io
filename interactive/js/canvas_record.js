class CanvasRecorder {
    constructor(canvas) {
        this.started = false
        this.canvas = canvas
    }

    record_frame() {
        if(!this.started) this.start()
        this.stream.getVideoTracks()[0].requestFrame()
    }

    start() {
        if(this.started) return

        this.stream   = this.canvas.captureStream(0)
        this.recorder = new MediaRecorder(this.stream)
        this.chunks   = []
        this.recorder.start()
        
        this.recorder.ondataavailable = e => {
            this.chunks.push(e.data)
        }
        
        this.recorder.onstop = e => {
            this.export(new Blob(this.chunks, {type: "video/mp4"}))
        }
        
        this.started = true
    }

    stop() {
        this.recorder.stop()
    }

    export(blob) {
        let a = document.createElement("a")
        a.download = "video.mp4"
        a.href = URL.createObjectURL(blob)

        document.body.appendChild(a)
        a.click()
        setTimeout(()=>{document.body.removeChild(a)}, 0)
    }
}
