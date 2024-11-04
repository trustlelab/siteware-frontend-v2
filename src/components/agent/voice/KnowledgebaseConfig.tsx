import React, { useState, useEffect } from "react";
import { fetchFileListThunk } from "../../../features/slices/fileSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { DownloadIcon } from "../../../assets/icons/Icons";
import Checkbox from "../../lib/Checkbox";
import Button from "../../lib/Button";
import API from "../../../utils/API";

const KnowledgeBaseConfig: React.FC = () => {
    const dispatch = useAppDispatch();
    const { files = [], loading, error } = useAppSelector((state) => state.file); // Default empty array to avoid null
    const { t } = useTranslation(['files']);
    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
    const [isBuilding, setIsBuilding] = useState(false);

    useEffect(() => {
        dispatch(fetchFileListThunk());
    }, [dispatch]);

    const toggleSelectFile = (fileId: number) => {
        setSelectedFiles(prev =>
            prev.includes(fileId) ? prev.filter(id => id !== fileId) : [...prev, fileId]
        );
    };

    const toggleSelectAll = () => {
        if (!files?.length) return; // If files is null or empty, return
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(files.map(file => file.id));
        }
    };

    const handleBuildKnowledge = async () => {
        // Retrieve agent ID from local storage
        const agentId = localStorage.getItem("selectedAgentId");

        if (!agentId) {
            toast.error("Agent ID not found in local storage");
            return;
        }

        // Collect UUIDs of selected files
        // Ensure files defaults to an empty array if it is null
        const selectedFileUuids = (files || [])
            .filter(file => selectedFiles.includes(file.id))
            .map(file => file.uuid);

        if (selectedFileUuids.length === 0) {
            toast.error("No files selected");
            return;
        }


        setIsBuilding(true);
        try {
            // Make API request to process files
             await API.post(`${import.meta.env.VITE_API_BASE_URL}/agent/processKnowledgebaseFiles`, {
                agentId: parseInt(agentId),
                uuids: selectedFileUuids
            });

            toast.success("Knowledge base built successfully");
        } catch (error) {
            console.error("Error building knowledge base:", error);
            toast.error("Failed to build knowledge base");
        } finally {
            setIsBuilding(false);
        }
    };

    return (
        <div className="px-4">
            <ToastContainer />

            {loading && <p>{t('loadingFiles')}</p>}
            {error && <p className="text-red-500">{t('error', { error })}</p>}

            <div className="mt-8 overflow-x-auto">
                <div className="shadow-2xl rounded-[12px] overflow-hidden border-b p-2 border border-gray-200 dark:border-gray-700 sm:rounded-lg">
                    <div className="my-4 px-3 flex justify-between">
                        <div>
                            <div className="flex space-x-3">
                                <div className="text-[#0f1728] dark:text-white text-lg font-semibold leading-7">Files</div>
                                <div className="h-7 px-3 py-1 bg-[#f4ebff] rounded-2xl justify-start items-center gap-1 inline-flex">
                                    <div className="text-center text-[#7e56d8] text-xs font-semibold font-['Manrope'] leading-tight">{files?.length} Files</div>
                                </div>
                            </div>
                            <div className="text-[#475467] text-sm font-semibold font-['Manrope'] leading-[25px]">Select the files you are interested in and build the knowledge base.</div>
                        </div>
                        <div>
                            <Button onClick={handleBuildKnowledge} disabled={selectedFiles.length === 0 || isBuilding}>
                                {isBuilding ? "Building..." : "Build knowledge"}
                            </Button>
                        </div>
                    </div>
                    {files && files.length > 0 ? (
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
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>{t('noFilesAvailable')}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBaseConfig;
