import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { fetchFileListThunk, uploadFileThunk, deleteFileThunk } from "../../features/slices/fileSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FaPlus } from "react-icons/fa";
import Button from "../lib/Button";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../common/Modal";
import Input from "../lib/Input";
import { useTranslation } from 'react-i18next';
import Checkbox from "../lib/Checkbox";
import { DeleteIcon, DownloadIcon, PlusIcon, SearchIcon, TrashIcon, UploadIcon } from "../../assets/icons/Icons";

const KnowledgeBase: React.FC = () => {
    const dispatch = useAppDispatch();
    const { files = [], loading, error } = useAppSelector((state) => state.file);

    const { t } = useTranslation(['files']);

    const [fileData, setFileData] = useState<File | null>(null);
    const [fileLabel, setFileLabel] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [fileToDelete, setFileToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

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
        dispatch(uploadFileThunk(formData))
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



    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleSelectFile = (fileId: number) => {
        setSelectedFiles(prev =>
            prev.includes(fileId) ? prev.filter(id => id !== fileId) : [...prev, fileId]
        );
    };

    const toggleSelectAll = () => {
        if (!files) return; // Check if files is not null
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(files.map(file => file.id));
        }
    };


    return (
        <div className="px-4 md:px-14 mt-9">
            <ToastContainer />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="mb-4 font-bold text-3xl">{t('Knowledge Base')}</h2>
                    <p className="mb-6 text-gray-600">{t('subtitle')}</p>
                </div>

                <Button type="icon-button" onClick={openModal}>
                    <FaPlus className="mr-2" />
                    {t('uploadButton')}
                </Button>
            </div>

            <div className='h-10 px-3.5 py-3 bg-white dark:bg-gray-800 rounded-lg shadow border border-[#cfd4dc] dark:border-gray-700 justify-start items-center gap-2 inline-flex'>
                <SearchIcon />
                <input
                    type="text"
                    value={""}
                    onChange={() => { }}
                    placeholder={t('search_agents')} // Translated placeholder
                    className="bg-transparent text-[#344053] dark:text-white outline-none"
                />
            </div>


            <Modal isOpen={isModalOpen} onClose={closeModal} className="w-[421px] dark:bg-gray-950">
                <div className="p-3  bg-white dark:bg-gray-700 rounded-[10px] shadow border border-[#eaecf0] dark:border-gray-700 justify-center items-center inline-flex">
                    <PlusIcon />
                </div>
                <div className="text-[#101828] text-xl font-bold dark:text-white leading-9 mt-4">{t('uploadTitle')}</div>
                <div className="text-[#475466] text-base font-medium  leading-[30px] dark:text-white">Upload and attach files.</div>
                <div className="w-full h-[0px] border border-[#eaecf0] dark:border-gray-500 my-4"></div>



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
                    className={`p-4 border-2  border-dashed rounded-lg text-center ${isDragActive ? "border-purple-600" : "border-gray-300"
                        }`}
                >
                    <input {...getInputProps()} />
                    {fileData ? (
                        <p className="text-gray-600">{t('selectedFile')}: {fileData.name}</p>
                    ) : (
                        <div className=" flex-col justify-start items-center gap-3 inline-flex">
                            <div className=" p-2.5 bg-[#f2f3f6] dark:bg-black rounded-[28px] border-4 border-[#f8f9fb] dark:border-gray-500 justify-center items-center inline-flex">
                               <UploadIcon />
                            </div>
                            <div className="self-stretch h-[52px] flex-col justify-start items-center gap-1 flex">
                                <div className="self-stretch justify-center items-center gap-1 inline-flex">
                                    <div className="justify-center items-center gap-2 flex">
                                        <div className="text-[#6840c6] text-base font-bold font-['Manrope'] underline leading-tight">Click to upload</div>
                                    </div>
                                    <div className="text-[#667084] text-base font-medium font-['Manrope'] leading-normal">or drag and drop</div>
                                </div>
                                <div className="self-stretch text-center text-[#667084] text-sm font-medium font-['Manrope'] leading-normal">SVG, PNG, JPG or GIF (max. 800x400px)</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 mt-6 ">


                    <Button onClick={() => setIsModalOpen(false)} variant='light' className="w-full">
                        {t('cancel')}
                    </Button>

                    <Button onClick={handleUploadFile} disabled={isUploading} className="w-full">
                        {isUploading ? t('uploading') : t('uploadFile')}
                    </Button>
                </div>


            </Modal>

         


            <Modal
              isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}
                className="bg-white dark:bg-gray-950 mx-auto p-6 rounded-lg max-w-md sm:w-[400px]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="w-12 h-12 bg-[#fee3e1] dark:bg-[#7f1d1d] rounded-[28px] border-8 border-[#fef2f1] dark:border-[#5a1a1a] justify-center items-center inline-flex">
                    <DeleteIcon />
                </div>

                <div className='mt-4'>
                    <div className="text-[#101828] dark:text-white text-xl font-bold leading-9">{t('Delete_knowledgeBase_file ')}</div>
                    <div className="text-[#475466] dark:text-gray-300 text-base font-medium leading-[30px]">{t('FIle_delete_confirmation')}</div>
                </div>
                <div className="w-[352px] h-[0px] border border-[#eaecf0] dark:border-gray-700 mt-6"></div>

                <div className="flex justify-end gap-4 mt-8">
                    <Button variant="light" onClick={() => setDeleteModalOpen(false)} className='w-full'>
                    {t('cancel')}

                    </Button>
                    <Button variant="error" onClick={handleDeleteFile} className='w-full'>
                    {isDeleting ? t('removing') : t('remove')}
                    </Button>
                </div>
            </Modal>

            {loading && <p>{t('loadingFiles')}</p>}
            {error && <p className="text-red-500">{t('error', { error })}</p>}

            <div className="mt-8 overflow-x-auto">
                <div className="shadow-lg rounded-[12px] overflow-hidden border-b p-2 border border-gray-200 dark:border-gray-700 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-[#667085]">
                            <tr>
                                <th className="px-6 py-3">
                                    <Checkbox checked={selectedFiles.length === files?.length} onChange={toggleSelectAll} />
                                </th>
                                <th className="px-6 py-3 text-start">{t('fileName')}</th>
                                <th className="px-6 py-3 text-start hidden md:table-cell">{t('label')}</th>
                                <th className="px-6 py-3 text-start hidden md:table-cell">{t('uuid')}</th>
                                <th className="px-6 py-3 hidden lg:table-cell text-start">{t('createdAt')}</th>
                                <th className="px-6 py-3 text-start">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {files?.map((file) => (
                                <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-3">
                                        <Checkbox
                                            checked={selectedFiles.includes(file.id)}
                                            onChange={() => toggleSelectFile(file.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.fileName}</div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{file.label || t('noLabel')}</div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{file.uuid}</div>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(file.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <a
                                                href={`${import.meta.env.VITE_API_BASE_URL}/download/${file.fileName}`}
                                                className=""
                                            >
                                                <DownloadIcon />
                                            </a>

                                            <button

                                                onClick={() => {
                                                    setFileToDelete(file.id);
                                                    setDeleteModalOpen(true);
                                                }}
                                            >
                                                <TrashIcon />
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

export default KnowledgeBase;
