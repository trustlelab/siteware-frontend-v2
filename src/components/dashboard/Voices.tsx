import React, { useState, useEffect, useRef } from "react";
import { fetchVoiceListThunk } from "../../features/slices/voicelabSlice"; 
import { useAppDispatch, useAppSelector } from "../../app/hooks"; 
import { RxSpeakerModerate } from "react-icons/rx"; 
import { FaStop } from "react-icons/fa"; 
import Button from "../lib/Button";
import { useTranslation } from 'react-i18next'; // Import the hook

const Voices: React.FC = () => {
    const dispatch = useAppDispatch();
    const { voices, loading, error } = useAppSelector((state) => state.voiceLab);
    const { t } = useTranslation(['voices']); // Use 'voices' namespace

    const [playing, setPlaying] = useState<string | null>(null); 
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        dispatch(fetchVoiceListThunk());
    }, [dispatch]);

    const handlePlayVoice = (previewUrl: string, voiceId: string) => {
        if (playing === voiceId) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
                setPlaying(null);
            }
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(previewUrl);
        audio.play();
        audioRef.current = audio;

        setPlaying(voiceId);
        audio.onended = () => {
            setPlaying(null);
            audioRef.current = null;
        };
    };

    return (
        <div className="sm:px-20">
            <h2 className="mb-4 font-bold text-3xl">{t('title')}</h2>
            <p className="mb-6 text-gray-600">{t('subtitle')}</p>

            {loading && <p>{t('loading')}</p>}

            {error && <p className="text-red-500">{t('error', { error })}</p>}

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {voices && voices.map((voice, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-dark-light rounded-lg p-4 transition-shadow transform hover:scale-105 duration-300 relative border border-gray-300 dark:border-gray-900"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl">{voice.name}</h3>
                            <span className="text-gray-500">{voice.labels.description || t('expressive')}</span>
                        </div>

                        <div className="grid grid-cols-2 rounded-lg mb-4">
                            <div className="flex flex-col items-start justify-center bg-gray-100 dark:bg-gray-900 p-3 rounded-tl-lg">
                                <span className="text-gray-500">{t('accent')}</span>
                                <span className="text-lg font-bold">{voice.labels.accent || t('NA')}</span>
                            </div>

                            <div className="flex flex-col items-start justify-center p-3">
                                <span className="text-gray-500">{t('age')}</span>
                                <span className="text-lg font-bold">{voice.labels.age || t('NA')}</span>
                            </div>

                            <div className="flex flex-col items-start justify-center p-3">
                                <span className="text-gray-500">{t('useCase')}</span>
                                <span className="text-lg font-bold">{voice.labels.use_case || t('NA')}</span>
                            </div>

                            <div className="flex flex-col items-start justify-center bg-gray-100 p-3 rounded-br-lg dark:bg-gray-900">
                                <span className="text-gray-500">{t('gender')}</span>
                                <span className="text-lg font-bold">{voice.labels.gender || t('NA')}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <Button
                                elevated
                                type="icon-button"
                                radius="full"
                                onClick={() => handlePlayVoice(voice.preview_url, voice.voice_id)}
                            >
                                {playing === voice.voice_id ? (
                                    <FaStop className="text-2xl mr-2" />
                                ) : (
                                    <RxSpeakerModerate className="text-2xl mr-2" />
                                )}
                                <span>{playing === voice.voice_id ? t('stop') : t('play')}</span>
                            </Button>
                          
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Voices;
