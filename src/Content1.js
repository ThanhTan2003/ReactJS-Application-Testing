import React, { useEffect, useState } from 'react'



function Content1() {
    const [show, setShow] = useState(false)
    const [doctors,setDoctors] = useState([])

    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [pageSize, setPageSize] = useState(50);
    const [totalElements, setTotalElements] = useState();
    const [page, setPage] = useState(1)

    useEffect(() => {
        const api = fetch(`http://localhost:8080/api/v1/doctor/get-all?page=${page}&size=${pageSize}`)
        api.then(res => res.json())
            .then(data => {
                setDoctors(data.data)
                setTotalPages(data.totalPages)
                setCurrentPage(data.currentPage)
                setPageSize(data.pageSize)
                setTotalElements(data.totalElements)
            })
    },[page, pageSize])

    console.log(doctors)

    // Tạo mảng các trang hiển thị
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxDisplayPages = 4;  // Số lượng trang liền kề với trang hiện tại sẽ hiển thị (4 trang trước và sau)
    
        // Hiển thị trang đầu tiên (chỉ hiển thị nếu currentPage > 1 và không nằm trong các trang đầu)
        if (currentPage > 5) {
            pageNumbers.push(1);
            if (currentPage > 6) {
                pageNumbers.push('...');
            }
        }
    
        // Các trang liền kề với trang hiện tại
        for (let i = currentPage - maxDisplayPages; i <= currentPage + maxDisplayPages; i++) {
            if (i > 0 && i <= totalPages) {
                pageNumbers.push(i);
            }
        }
    
        // Dấu "..." giữa trang hiện tại và trang cuối
        if (currentPage < totalPages - maxDisplayPages - 1) {
            pageNumbers.push('...');
        }
    
        // Trang cuối cùng (chỉ hiển thị nếu currentPage < tổng số trang và không nằm trong các trang cuối)
        if (currentPage < totalPages - maxDisplayPages) {
            pageNumbers.push(totalPages);
        }
    
        return pageNumbers;
    };
    

    return (
        <div style ={{padding: 20}}>
            <div style={{ marginBottom: '20px' }}>
                {/* Combobox để chọn số phần tử mỗi trang */}
                <label htmlFor="pageSizeSelect">Số phần tử mỗi trang: </label>
                <select
                    id="pageSizeSelect"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));  // Cập nhật pageSize
                        setPage(1); // Đặt lại trang về 1 khi thay đổi pageSize
                    }}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className='buttonPage'>
                {
                    getPageNumbers().map((pageNumber, index) => (
                        typeof pageNumber === 'number' ? (
                            <button
                                key={index}
                                onClick={() => setPage(pageNumber)}
                                style={page === pageNumber ? { color: '#fff', backgroundColor: '#333' } : {}}
                            >{pageNumber}</button>
                        ) : (
                            <span key={index} style={{ margin: '0 5px' }}>...</span>
                        )
                    ))
                }
            </div>
            <h4>Tổng số bác sĩ: {totalElements}</h4>
            <h4>Trang hiện tại: {currentPage}/{totalPages}</h4>
            <hr></hr>
            {
                doctors.map((doctor, index) =>(
                    <ul key={doctor.id}>
                        <li>
                            <p>STT: {index + 1 + (currentPage - 1) * pageSize}</p>
                            <p>Mã BS: {doctor.id}</p>
                            <p>Họ tên: {doctor.fullName}</p>
                            <p>Giới tính: {doctor.gender}</p>
                            <p>Chuyên khoa: {doctor.education}</p>
                            <p>Trạng thái: {doctor.status}</p>
                        </li>
                        <hr></hr>
                    </ul>
                ))
            }
        </div>
        )
}

export default Content1;