interface DetailBlockProps {
children: React.ReactNode;
}

export const DetailBlock = ({children}: DetailBlockProps) => {
    return (
        <div className="bg-slate-500 rounded-lg mt-4 p-2">
            {children}
        </div>
    );
};
