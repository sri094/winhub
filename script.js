let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const updatePosition = (e) => {
      if (!this.holdingPaper) return;

      this.mouseX = e.clientX || e.touches[0].clientX;
      this.mouseY = e.clientY || e.touches[0].clientY;

      // Calculate the new position based on mouse/touch position
      this.currentPaperX = this.mouseX - this.mouseTouchX;
      this.currentPaperY = this.mouseY - this.mouseTouchY;

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    };

    const handleMouseDown = (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.mouseTouchX = e.clientX || e.touches[0].clientX;
      this.mouseTouchY = e.clientY || e.touches[0].clientY;

      if (e.button === 2) {
        this.rotating = true; // Right-click for rotation
      }
    };

    const handleMouseUp = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Mouse events
    document.addEventListener('mousemove', updatePosition);
    paper.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Prevent scrolling
      handleMouseDown(e.touches[0]);
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Prevent scrolling
      updatePosition(e);
    });

    window.addEventListener('touchend', handleMouseUp);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
