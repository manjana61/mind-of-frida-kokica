import confetti from 'canvas-confetti' 

export let launchConfetti = () => { /* Kopirao sa gugla */
    let end = Date.now() + (10 * 1000);

    // go Buckeyes!
    let colors = ['#66FCF1', '#123C69' /* '#5D001E' *//* '#557A95' */];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
}