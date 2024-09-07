import React, { useEffect, useState } from 'react'

function Content2() {
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])

    const [provinceCode, setProvinceCode] = useState()
    const [districtCode, setDistrictCode] = useState()
    const [wardCode, setWardCode] = useState()

    // Fetch provinces
    useEffect(() => {
        const api = fetch("http://localhost:8080/api/v1/vietnam-units/province")
        api.then(res => res.json())
            .then(data => {
                setProvince(data)
            })
            .catch(error => {
                console.error("Error fetching province data: ", error)
            })
    }, [])

    // Fetch districts when provinceCode changes
    useEffect(() => {
        if (provinceCode) {
            const api = fetch(`http://localhost:8080/api/v1/vietnam-units/district/province-code/${provinceCode}`)
            api.then(res => res.json())
                .then(data => {
                    setDistrict(data)
                })
                .catch(error => {
                    console.error("Error fetching district data: ", error)
                })
        }
    }, [provinceCode])

    // Fetch wards when districtCode changes
    useEffect(() => {
        if (districtCode) {
            const api = fetch(`http://localhost:8080/api/v1/vietnam-units/ward/district-code/${districtCode}`)
            api.then(res => res.json())
                .then(data => {
                    setWard(data)
                })
                .catch(error => {
                    console.error("Error fetching ward data: ", error)
                })
        }
    }, [districtCode])

    return (
        <div>
            <h1>Địa chỉ</h1>
            
            {/* Province selection */}
            <select onChange={(e) => {
                setProvinceCode(e.target.value)
                setDistrictCode('');
                setWardCode('');
            }}>
                <option value="">Chọn tỉnh/thành phố</option>
                {
                    province.map(province => (
                        <option key={province.code} value={province.code}>
                            {province.fullName}
                        </option>
                    ))
                }
            </select>

            {/* District selection */}
            <select onChange={(e) => {
                setDistrictCode(e.target.value)
            }} disabled={!provinceCode}>
                <option value="">Chọn quận/huyện</option>
                {
                    district.map(district => (
                        <option key={district.code} value={district.code}>
                            {district.fullName}
                        </option>
                    ))
                }
            </select>

            {/* Ward selection */}
            <select onChange={(e) => {
                setWardCode(e.target.value)
            }} 
            disabled={!districtCode}
            value={wardCode}
            >
                <option value="">Chọn xã/phường</option>
                {
                    ward.map(ward => (
                        <option key={ward.code} value={ward.code}>
                            {ward.fullName}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Content2;