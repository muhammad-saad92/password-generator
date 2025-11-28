import {useState, useEffect, useCallback, useRef} from 'react';

function App() {
    const [length, setLength] = useState(12);
    const [charAllowed, setCharAllowed] = useState(false);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [password, setPassword] = useState('');
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        if (numberAllowed) str += '0123456789';
        if (charAllowed) str += '!@#$%^&*()_=+-}{?';

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numberAllowed, charAllowed]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }, [password]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed, passwordGenerator]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-2xl p-6 text-gray-100 border border-gray-700/50">
                
                <h1 className="text-4xl font-serif tracking-wide font-bold text-center mb-8 text-orange-400">
                    Password Generator
                </h1>

                {/* Result Box */}
                <div className="flex items-center gap-3 mb-6">
                    <input
                        type="text"
                        value={password}
                        readOnly
                        ref={passwordRef}
                        className="flex-grow px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
                    />
                    <button 
                        onClick={copyPasswordToClipboard}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition"
                    >
                        Copy
                    </button>
                </div>

                {/* Controls */}
                <div className="space-y-6">

                    {/* Length Slider */}
                    <div className="flex items-center justify-between">
                        <label className="font-medium">Length: {length}</label>
                        <input 
                            type="range" 
                            min={6} 
                            max={40} 
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className="w-2/3 cursor-pointer accent-orange-500 focus:shadow-lg "
                        />
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <label className="font-medium">Include Numbers</label>
                        <input 
                            type="checkbox"
                            checked={numberAllowed}
                            onChange={() => setNumberAllowed(prev => !prev)}
                            className="w-5 h-5 accent-orange-500 cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <label className="font-medium">Include Special Characters</label>
                        <input 
                            type="checkbox"
                            checked={charAllowed}
                            onChange={() => setCharAllowed(prev => !prev)}
                            className="w-5 h-5 accent-orange-500 cursor-pointer"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
