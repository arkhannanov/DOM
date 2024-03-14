import React, {useEffect, useState} from 'react';
import {Table, Input} from 'antd';
import {CaretDownOutlined, CaretUpOutlined, SearchOutlined} from "@ant-design/icons";


const FETCH_URL = 'https://iss.moex.com/iss/engines/stock/markets/index/boardgroups/9/securities.jsonp?iss.meta=off&iss.json=extended&lang=ru&security_collection=72&sort_column=VALTODAY&sort_order=desc'
const columns = [
    {
        title: 'Код',
        dataIndex: 'SECID',
        key: 'SECID',
    },
    {
        title: 'Индекс',
        dataIndex: 'SHORTNAME',
        key: 'SHORTNAME',
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => {
            return (
                <>
                    <Input
                        autoFocus
                        placeholder="Введите значение"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            clearFilters();
                        }}
                    ></Input>
                </>
            );
        },
        filterIcon: () => {
            return <SearchOutlined />;
        },
        onFilter: (value, record) => {
            return record.SHORTNAME.toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        title: 'Значение',
        dataIndex: 'CURRENTVALUE',
        key: 'CURRENTVALUE',
        align: 'right',
        render: (number, row) => <p>
            {number.toLocaleString('ru-RU')}
            {' '}
            {row.LASTCHANGEPRC >=0 ? <CaretUpOutlined style={{color: 'green'}}/> : <CaretDownOutlined style={{color: 'red'}}/>}
        </p>
    },
    {
        title: 'Изм, %',
        dataIndex: 'LASTCHANGEPRC',
        key: 'LASTCHANGEPRC',
        render: (number) => <div>{number >=0 ? <p style={{color: 'green'}}>{'+'+number+ '%'}</p> : <p style={{color: 'red'}}>{number + '%'}</p>}</div>
    },
    {
        title: 'Открытие',
        dataIndex: 'OPENVALUE',
        key: 'OPENVALUE',
        render: (number) => <p>{number.toLocaleString('ru-RU')}</p>
    },
    {
        title: 'Мин.',
        dataIndex: 'LOW',
        key: 'LOW',
        render: (number) => <p>{number.toLocaleString('ru-RU')}</p>
    },
    {
        title: 'Макс.',
        dataIndex: 'HIGH',
        key: 'HIGH',
        render: (number) => <p>{number.toLocaleString('ru-RU')}</p>
    },
    {
        title: 'Объем торгов, руб',
        dataIndex: 'VALTODAY',
        key: 'VALTODAY',
        render: (number) => <p>{number.toLocaleString('ru-RU')}</p>
    },
    {
        title: 'Время',
        dataIndex: 'TIME',
        key: 'TIME',
    },
];

const DevelopmentTable = (props) => {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(FETCH_URL).then(response => response.json()).then(data =>
        {
            const array1 = [...data[1].marketdata]
            const array2 = [...data[1].securities]

            const combinedArray = [];

            for (let i = 0; i < array1.length; i++) {
                const obj1 = array1[i]
                const obj2 = array2[i]
                const mergedObj = { ...obj1, ...obj2 }
                combinedArray.push(mergedObj)
            }
            setTableData(combinedArray)
        })
    }, []);

    console.log(tableData)

    return (
        <Table columns={columns} dataSource={tableData}  rowKey={(record) => record.SECID
        }/>
    )

};

export default DevelopmentTable;
