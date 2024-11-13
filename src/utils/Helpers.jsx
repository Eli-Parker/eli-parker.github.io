import gsap from "gsap";
/**
 * File contains a collection of helper functions which multiple components use
 */


/**
 * Animates the scale of the given references to create an "in" effect.
 *
 * @param {Array} refs - An array of references to the elements to animate.
 * @returns {Promise<void>} A promise that resolves when all animations are complete.
 * Here make sure other animations are complete before resolving.
 */
export async function animateIn(refs) {
    const animations = refs.map((ref) =>
      gsap.to(ref.current.scale, {
        duration: 0.3,
        x: 1.2,
        y: 1.2,
        z: 1.2,
        ease: "elastic.out(1,0.5)",
      })
    );
    await Promise.all(animations);
  }
  
  /**
   * Animates the scale of the given references to create an "out" effect.
   *
   * @param {Array} refs - An array of references to the elements to animate.
   * @returns {Promise<void>} A promise that resolves when all animations are complete.
   * Here make sure other animations are complete before resolving.
   */
  export async function animateOut(refs) {
    const animations = refs.map((ref) =>
      gsap.to(ref.current.scale, {
        duration: 0.3,
        x: 1,
        y: 1,
        z: 1,
        ease: "elastic.out(1,0.5)",
      })
    );
    await Promise.all(animations);
  }
  
  /**
   * Handles the click event for opening a site in a new tab.
   * Prevents spamming the same site by introducing a delay between clicks.
   *
   * @param {string} site - The URL of the site to open.
   * @param {boolean} recentClick - The state indicating if a recent click has occurred.
   * @param {Function} setRecentClick - The function to set the recent click state.
   */
  export async function handleClick(site, recentClick, setRecentClick) {
    // stop from spamming the same site
    if (recentClick) return;
  
    // Set the recent click
    setRecentClick(true);
  
    // Open the site in a new tab
    window.open(site, "_blank");
  
    // wait one quarter second before allowing another click
    await new Promise((r) => setTimeout(r, 250));
  
    setRecentClick(false);
  }