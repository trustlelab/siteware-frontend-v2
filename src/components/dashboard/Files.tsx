import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { fetchFileListThunk, uploadFileThunk, deleteFileThunk } from "../../features/slices/fileSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FaTrash, FaDownload, FaPlus, FaCopy } from "react-icons/fa";
import Button from "../lib/Button";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../common/Modal";
import Input from "../lib/Input";
import { useTranslation } from 'react-i18next';

const Files: React.FC = () => {
    const dispatch = useAppDispatch();
    const { files, loading, error } = useAppSelector((state) => state.file);
    const { t } = useTranslation(['files']); // Add i18n hook with 'files' namespace

    const [fileData, setFileData] = useState<File | null>(null); 
    const [fileLabel, setFileLabel] = useState<string>(''); 
    const [isUploading, setIsUploading] = useState<boolean>(false); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [fileToDelete, setFileToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchFileListThunk());
    }, [dispatch]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/pdf': []
        }, 
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setFileData(acceptedFiles[0]);
            }
        },
    });
    
    const handleUploadFile = () => {
        if (!fileData) return;

        const formData = new FormData();
        formData.append('file', fileData);
        formData.append('label', fileLabel);

        setIsUploading(true);
        const uploadThunk = uploadFileThunk(formData);

        dispatch(uploadThunk)
            .unwrap()
            .then(() => {
                toast.success(t('uploadSuccess'));
                setIsUploading(false);
                setFileData(null);
                setIsModalOpen(false);
            })
            .catch(() => {
                toast.error(t('uploadError'));
                setIsUploading(false);
            });
    };

    const handleDeleteFile = () => {
        if (fileToDelete !== null) {
            setIsDeleting(true);
            dispatch(deleteFileThunk(fileToDelete))
                .unwrap()
                .then(() => {
                    toast.success(t('deleteSuccess'));
                    setDeleteModalOpen(false);
                    setIsDeleting(false);
                })
                .catch(() => {
                    toast.error(t('deleteError'));
                    setIsDeleting(false);
                });
        }
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success(t('copySuccess'));
            })
            .catch(() => {
                toast.error(t('copyError'));
            });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = (fileId: number) => {
        setFileToDelete(fileId);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setFileToDelete(null);
    };

    return (
        <div className="px-4 md:px-14">
            <ToastContainer />
            <h2 className="mb-4 font-bold text-3xl">{t('title')}</h2>
            <p className="mb-6 text-gray-600">{t('subtitle')}</p>

            <Button type="icon-button" onClick={openModal}>
                <FaPlus className="mr-2" />
                {t('uploadButton')}
            </Button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h3 className="text-2xl font-bold mb-4">{t('uploadTitle')}</h3>
                <div className="mb-4">
                    <Input
                        label={t('fileLabel')}
                        type="text"
                        value={fileLabel}
                        onChange={(e) => setFileLabel(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder={t('enterFileLabel')}
                    />
                </div>
                <div
                    {...getRootProps()}
                    className={`p-4 border-2 border-dashed rounded-lg text-center ${
                        isDragActive ? "border-purple-600" : "border-gray-300"
                    }`}
                >
                    <input {...getInputProps()} />
                    {fileData ? (
                        <p className="text-gray-600">{t('selectedFile')}: {fileData.name}</p>
                    ) : (
                        <p className="text-gray-500">{t('dropzoneText')}</p>
                    )}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Button type="button" variant="success" onClick={handleUploadFile} disabled={!fileData || isUploading}>
                        {isUploading ? t('uploading') : t('uploadFile')}
                    </Button>
                    <Button type="button" variant="error" onClick={closeModal}>
                        {t('cancel')}
                    </Button>
                </div>
            </Modal>

            <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
                <h3 className="text-xl font-bold mb-4">{t('confirmDelete')}</h3>
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="error" onClick={handleDeleteFile} disabled={isDeleting}>
                        {isDeleting ? t('removing') : t('remove')}
                    </Button>
                    <Button type="button" variant="success" onClick={closeDeleteModal}>
                        {t('cancel')}
                    </Button>
                </div>
            </Modal>

            {loading && <p>{t('loadingFiles')}</p>}
            {error && <p className="text-red-500">{t('error', { error })}</p>}

            <div className="mt-8 overflow-x-auto"> {/* Add overflow-x-auto for mobile scrolling */}
                <div className="shadow-md overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    {t('fileName')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                                    {t('label')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                                    {t('uuid')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                                    {t('createdAt')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {files && files.map((file, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.fileName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell"> {/* Hidden on small screens */}
                                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{file.label || t('noLabel')}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell"> {/* Hidden on small screens */}
                                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{file.uuid}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell"> {/* Hidden on small and medium screens */}
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(file.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <a
                                                href={`${import.meta.env.VITE_API_BASE_URL}/download/${file.fileName}`}
                                                className="p-2 rounded-full dark:bg-black dark:text-white bg-gray-100 hover:dark:bg-gray-800 transition duration-200"
                                            >
                                                <FaDownload className="text-lg text-gray-600" />
                                            </a>
                                            <button
                                                className="p-2 rounded-full dark:bg-black dark:text-white bg-gray-100 hover:dark:bg-gray-800 transition duration-200"
                                                onClick={() => handleCopyUrl(`${import.meta.env.VITE_API_BASE_URL}${file.url}`)}
                                            >
                                                <FaCopy className="text-lg text-gray-600" />
                                            </button>
                                            <button
                                                className="p-2 rounded-full dark:bg-black dark:text-white bg-gray-100 hover:dark:bg-gray-800 transition duration-200"
                                                onClick={() => confirmDelete(file.id)}
                                            >
                                                <FaTrash className="text-lg text-gray-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Files;
