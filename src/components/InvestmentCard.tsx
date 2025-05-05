type CardProps = {
    title: string;
    range: string;
    interest: string;
};

export default function InvestmentCard({ title, range, interest }: CardProps) {
    return (
        <div className="bg-[#131c31] text-white rounded-xl p-4 shadow-lg border border-blue-600 w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-md mb-2">{range}</p>
            {/* <div className="text-sm border-t border-gray-600 pt-2 space-y-1">
                <p>
                    Interest <span className="text-purple-300">{interest}</span>
                </p>
                <p>
                    Capital will back <span className="text-green-400 font-bold">YES</span>
                </p>
                <p>
                    Profit for <span className="text-yellow-400 font-bold">REPEAT</span>
                </p>
            </div> */}
        </div>
    );
}
