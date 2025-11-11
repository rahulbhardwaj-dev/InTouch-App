
const keySounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
]

function useKeyboardSound() {
    const playRandomSound = () => {
        const randomSound = keySounds[Math.floor(Math.random() * keySounds.length)];

        randomSound.currentTime = 0;
        randomSound.play().catch(err => console.log("Audio Sound Play failed", err))
    }

    return {playRandomSound}
}

export default useKeyboardSound;
