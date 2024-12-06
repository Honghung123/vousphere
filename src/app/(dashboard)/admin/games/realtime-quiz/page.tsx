import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GameInfo = {
    name: string;
    image: string; // URL hình ảnh
    type: string;
    allowTrading: boolean;
    guide: string;
};

const GameCard: React.FC<GameInfo> = ({ name, image, type, allowTrading, guide }) => {
    return (
        <Card className="w-full max-w-md border shadow-md">
            {/* Header: Hình ảnh và tên */}
            <CardHeader className="relative">
                <img src={image} alt={name} className="h-48 w-full object-cover rounded-t" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-lg font-bold w-full">
                    {name}
                </div>
            </CardHeader>

            {/* Nội dung */}
            <CardContent className="space-y-4 p-4">
                <div className="text-sm text-gray-700">
                    <span className="font-semibold">Loại trò chơi:</span> {type}
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-semibold">Trao đổi vật phẩm:</span>{" "}
                    {allowTrading ? (
                        <span className="text-green-500 font-medium">Được phép</span>
                    ) : (
                        <span className="text-red-500 font-medium">Không được phép</span>
                    )}
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-semibold">Hướng dẫn:</span> {guide}
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex justify-end p-4">
                <Button variant="outline">Chi tiết</Button>
            </CardFooter>
        </Card>
    );
};

export default GameCard;
