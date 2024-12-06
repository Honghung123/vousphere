"use client";
import React, { useState } from "react";

const EventForm = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [voucherCount, setVoucherCount] = useState(0);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const eventData = {
            name,
            image,
            voucherCount: Number(voucherCount),
            startTime,
            endTime,
        };
        console.log(eventData);
        // Reset form fields
        setName("");
        setImage("");
        setVoucherCount(0);
        setStartTime("");
        setEndTime("");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Tạo Sự Kiện Mới</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tên Sự Kiện</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Hình Ảnh URL</label>
                <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Số Lượng Voucher</label>
                <input
                    type="number"
                    value={voucherCount}
                    onChange={(e: any) => setVoucherCount(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Thời Gian Bắt Đầu</label>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Thời Gian Kết Thúc</label>
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600">
                Tạo Sự Kiện
            </button>
        </form>
    );
};

export default EventForm;