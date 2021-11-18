import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { Layout, Table, Tag, Space, Button, Drawer, Card, Row, Col, Input, Divider, Menu, Select, Upload, message, PageHeader, Avatar } from 'antd';

import { PlusOutlined, RollbackOutlined, AppstoreOutlined, CodeSandboxOutlined, TableOutlined, MenuOutlined, QuestionOutlined, RadarChartOutlined,PieChartOutlined, UploadOutlined,UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';



import { Typography } from 'antd';
import { addCoreBusinessRuleAction, addBusinessRuleAction, deleteCoreBusinessRuleAction, deleteBusinessRuleAction, editCoreBusinessRuleAction, editBusinessRuleAction, addCategoryAction, editCategoryAction, deleteCategoryAction, addProductClassAction, deleteProductClassAction, addQuestionnaireAction } from '../store/modules/actions';
const { TextArea } = Input;

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;


function Dashboard() {
    const [selectedTab, setselectedTab] = useState('product_class')

    const renderTabs = (tab) => {
        switch (tab) {
            case "core_business_rules":
                return <BusinessRulesCore />
            case "business_rules":
                return <BusinessRules />
            case "categories":
                return <Categories />
            case "product_class":
                return <ProductClass />
            case "returns":
                return <Returns />
            case "business_questionnaires":
                return <Questionnaires />
            case "ai_model":
                return <AiModalInterface />
            default:
                return <ProductClass />
        }

    }
    return (
        <div>
            <Layout>
                <Sider style={{ height: "100vh", backgroundColor: 'white' }} width="250">
                    <Menu
                        onClick={e => setselectedTab(e.key)}
                        style={{ width: 250 }}
                        defaultSelectedKeys={['product_class']}
                        mode="inline"
                    >

                        <Menu.ItemGroup key="home" title={<Title level={3}>fala returns</Title>} ></Menu.ItemGroup>
                        <Divider />
                        <Menu.ItemGroup key="catalog" title="Catalog">
                            <Menu.Item key="categories" icon={<PieChartOutlined />}>Catogries</Menu.Item>
                            <Menu.Item key="product_class" icon={<AppstoreOutlined />}>Product Class</Menu.Item>
                            <Menu.Item key="products" icon={<CodeSandboxOutlined />}>Products</Menu.Item>
                            <Menu.Item key="returns" icon={<RollbackOutlined />}>Returns</Menu.Item>
                        </Menu.ItemGroup>
                        {/* <Divider /> */}
                        <Menu.ItemGroup key="portal" title="Rule Engine">
                            <Menu.Item key="core_business_rules" icon={<MenuOutlined />}>Core Rules</Menu.Item>
                            <Menu.Item key="business_rules" icon={<TableOutlined />}>Rules</Menu.Item>
                            <Menu.Item key="business_questionnaires" icon={<QuestionOutlined />}>Questionnaires</Menu.Item>
                            <Menu.Item key="ai_model" icon={<RadarChartOutlined />}>AI Modal Interface</Menu.Item>
                        </Menu.ItemGroup>
                        {/* <Divider /> */}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ backgroundColor: "rgb(239 242 245)"}}><span className="reverse-row" style={{ fontSize: "30px", fontWeight: 'bold', alignSelf:"left", marginTop:"20px" }}><Avatar size={48} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  </span></Header>
                    {/* <Header><PageHeader
                        extra={[
                            <Button key="1" type="primary">
                                Primary
                            </Button>,
                        ]}></PageHeader>
                    </Header> */}
                    <Content style={{ padding: "30px" }}>{renderTabs(selectedTab)}</Content>
                </Layout>

            </Layout>
        </div>
    )
}

export default Dashboard



// import { Table, Tag, Space, Button, Drawer, Card, Row, Col, Input, Divider } from 'antd'
// import { PlusOutlined } from '@ant-design/icons';
// import { useSelector } from 'react-redux';

// import { Typography } from 'antd';
// import { addCoreBusinessRuleAction } from '../store/modules/actions';
// const { TextArea } = Input;

// const { Title } = Typography;

function BusinessRulesCore() {

    const { coreBusinessRulesList } = useSelector(state => state.productReturn)
    const [showAddCoreRuleDrawer, setShowAddCoreRuleDrawer] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mode, setmode] = useState('add')
    const [rowSelected, setrowSelected] = useState({})

    const columns = [
        // {
        //     title: 'SNo',
        //     dataIndex: 'sno',
        //     key: 'sno',
        // }
        ,
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setmode('edit')
                        setShowAddCoreRuleDrawer(true)
                        setTitle(record.title)
                        setDescription(record.description)
                        setrowSelected(record)
                    }}>Edit</Button>
                    <Button onClick={() => {
                        deleteCoreBusinessRuleAction(record.id)
                    }}>Delete</Button>
                </Space>
            ),
        }
    ]

    const handleSubmit = () => {
        if (title != '' && description != '') {
            if (mode == 'add') {
                addCoreBusinessRuleAction({
                    "id": coreBusinessRulesList && coreBusinessRulesList.length + 1 || 1,
                    "sno": coreBusinessRulesList && coreBusinessRulesList.length + 1 || 1,
                    "title": title,
                    "description": description
                })
                setTitle('')
                setDescription('')
                setShowAddCoreRuleDrawer(false)
            }
            if (mode == "edit")
                editCoreBusinessRuleAction({
                    "id": rowSelected.id,
                    "sno": rowSelected.id,
                    "title": title,
                    "description": description
                })
            setTitle('')
            setDescription('')
            setShowAddCoreRuleDrawer(false)
            setmode('add')
            setrowSelected({})

        } else {

        }
    }

    const handleDelete = () => {

    }


    return (
        <div>
            <Card title="Core Rules"
                extra={<Row gutter={16}>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => { setShowAddCoreRuleDrawer(!showAddCoreRuleDrawer) }
                            } >
                            <PlusOutlined />Add Core Rule
                        </Button>
                    </Col></Row>} >
                <Table
                    columns={columns}
                    dataSource={coreBusinessRulesList}
                />
            </Card>
            <Drawer title="Add Core Rule" placement="right" width="30%" onClose={() => {
                setrowSelected({})
                setmode('add')
                setTitle('')
                setDescription('')
                setShowAddCoreRuleDrawer(false)
            }} visible={showAddCoreRuleDrawer}>
                <Space direction="vertical" width="100%" size="middle">
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Title </Tag>
                    {/* <Title level={5}>Title</Title> */}
                    <Input style={{ width: 400 }} placeholder="Enter title of Core rule" onChange={e => setTitle(e.target.value)} value={title} />
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Description </Tag><TextArea style={{ width: 400 }} rows={3} onChange={e => setDescription(e.target.value)} value={description} />

                    {/* <Divider /> */}
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={() => {
                            setShowAddCoreRuleDrawer(false)
                            setrowSelected({})
                            setmode('add')
                            setTitle('')
                            setDescription('')
                        }} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </div>
                    <Divider />
                </Space>
            </Drawer>

        </div>
    )
}





function BusinessRules() {

    const { businessRulesList, coreBusinessRulesList } = useSelector(state => state.productReturn)
    const [showAddRuleDrawer, setShowAddRuleDrawer] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [associatedCoreBusinessRule, setassociatedCoreBusinessRule] = useState('')
    const [mode, setmode] = useState('add')
    const [rowSelected, setrowSelected] = useState({})

    const columns = [
        // {
        //     title: 'SNo',
        //     dataIndex: 'sno',
        //     key: 'sno',
        // }
        ,
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: 'Associated Core Business Rule',
            dataIndex: 'associatedCoreBusinessRule',
            key: 'associatedCoreBusinessRule',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setShowAddRuleDrawer(true)
                        setTitle(record.title)
                        setDescription(record.description)
                        setassociatedCoreBusinessRule(record.associatedCoreBusinessRule)
                        setmode('edit')
                        setrowSelected(record)
                    }}>Edit</Button>
                    <Button onClick={() => {
                        deleteBusinessRuleAction(record.id)
                    }}>Delete</Button>
                </Space>
            ),
        }
    ]

    const handleSubmit = () => {
        if (title != '' && description != '' && associatedCoreBusinessRule != '') {
            if (mode == "add") {
                addBusinessRuleAction({
                    "id": businessRulesList && businessRulesList.length + 1 || 1,
                    "sno": businessRulesList && businessRulesList.length + 1 || 1,
                    "title": title,
                    "description": description,
                    "associatedCoreBusinessRule": associatedCoreBusinessRule
                })
                setTitle('')
                setDescription('')
                setassociatedCoreBusinessRule('')
                setShowAddRuleDrawer(false)
            }

            if (mode == 'edit') {
                editBusinessRuleAction({
                    "id": rowSelected.id,
                    "sno": rowSelected.id,
                    "title": title,
                    "description": description,
                    "associatedCoreBusinessRule": associatedCoreBusinessRule
                })
                setTitle('')
                setDescription('')
                setassociatedCoreBusinessRule('')
                setmode('add')
                setrowSelected({})
                setShowAddRuleDrawer(false)
            }

        } else {
            console.error(associatedCoreBusinessRule)
        }
    }


    return (
        <div>
            <Card title="Rules"
                extra={<Row gutter={16}>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => { setShowAddRuleDrawer(!showAddRuleDrawer) }
                            } >
                            <PlusOutlined />Add Rule
                        </Button>
                    </Col></Row>} >
                <Table
                    columns={columns}
                    dataSource={businessRulesList}
                />
            </Card>
            <Drawer title="Add Core Rule" placement="right" width="30%" onClose={() => {
                setrowSelected({})
                setmode('add')
                setTitle('')
                setDescription('')
                setassociatedCoreBusinessRule('')
                setShowAddRuleDrawer(false)
            }} visible={showAddRuleDrawer}>
                <Space direction="vertical" width="100%" size="middle">
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Associate a Core Rule </Tag>
                    <Select
                        showSearch
                        value={associatedCoreBusinessRule}
                        style={{ width: 400 }}
                        placeholder="Select a Core Rule to associate"
                        onChange={val => setassociatedCoreBusinessRule(val)}
                    >
                        {coreBusinessRulesList.map(item => <Option value={item.title} key={item.id}>{item.title}</Option>)}
                    </Select>
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Title </Tag>
                    <Input style={{ width: 400 }} placeholder="Enter title of rule" onChange={e => setTitle(e.target.value)} value={title} />
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Description </Tag><TextArea style={{ width: 400 }} rows={3} onChange={e => setDescription(e.target.value)} value={description} />

                    {/* <Divider /> */}
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={() => {
                            setShowAddRuleDrawer(false)
                            setrowSelected({})
                            setmode('add')
                            setTitle('')
                            setDescription('')
                            setassociatedCoreBusinessRule('')
                        }} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </div>
                    <Divider />
                </Space>
            </Drawer>

        </div>
    )
}


function Categories() {

    const { categoriesList } = useSelector(state => state.productReturn)
    const [showAddDrawer, setShowAddDrawer] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mode, setmode] = useState('add')
    const [rowSelected, setrowSelected] = useState({})

    const columns = [
        // {
        //     title: 'SNo',
        //     dataIndex: 'sno',
        //     key: 'sno',
        // }
        ,
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setmode('edit')
                        setShowAddDrawer(true)
                        setTitle(record.title)
                        setDescription(record.description)
                        setrowSelected(record)
                    }}>Edit</Button>
                    <Button onClick={() => {
                        deleteCategoryAction(record.id)
                    }}>Delete</Button>
                </Space>
            ),
        }
    ]

    const handleSubmit = () => {
        if (title != '' && description != '') {
            if (mode == 'add') {
                addCategoryAction({
                    "id": categoriesList && categoriesList.length + 1 || 1,
                    "sno": categoriesList && categoriesList.length + 1 || 1,
                    "title": title,
                    "description": description
                })
                setTitle('')
                setDescription('')
                setShowAddDrawer(false)
            }
            if (mode == "edit") {
                editCategoryAction({
                    "id": rowSelected.id,
                    "sno": rowSelected.id,
                    "title": title,
                    "description": description
                })
                setTitle('')
                setDescription('')
                setShowAddDrawer(false)
                setmode('add')
                setrowSelected({})
            }


        } else {

        }
    }

    const handleDelete = () => {

    }


    return (
        <div>
            <Card title="Categories"
                extra={<Row gutter={16}>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => { setShowAddDrawer(!showAddDrawer) }
                            } >
                            <PlusOutlined />Add Core Rule
                        </Button>
                    </Col></Row>} >
                <Table
                    columns={columns}
                    dataSource={categoriesList}
                />
            </Card>
            <Drawer title="Add Category" placement="right" width="30%" onClose={() => {
                setrowSelected({})
                setmode('add')
                setTitle('')
                setDescription('')
                setShowAddDrawer(false)
            }} visible={showAddDrawer}>
                <Space direction="vertical" width="100%" size="middle">
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Title </Tag>
                    {/* <Title level={5}>Title</Title> */}
                    <Input style={{ width: 400 }} placeholder="Enter title of Core rule" onChange={e => setTitle(e.target.value)} value={title} />
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Description </Tag><TextArea style={{ width: 400 }} rows={3} onChange={e => setDescription(e.target.value)} value={description} />

                    {/* <Divider /> */}
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={() => {
                            setShowAddDrawer(false)
                            setrowSelected({})
                            setmode('add')
                            setTitle('')
                            setDescription('')
                        }} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </div>
                    <Divider />
                </Space>
            </Drawer>

        </div>
    )
}



function ProductClass() {

    const { productClassList, businessRulesList, questionnairesList } = useSelector(state => state.productReturn)
    const [showAddDrawer, setShowAddDrawer] = useState(false)
    const [title, setTitle] = useState('')
    const [keywords, setKeywords] = useState('')
    const [actions, setactions] = useState([])//what business rules to be added
    const [questionnaires, setquestionnaires] = useState([])
    const [mode, setmode] = useState('add')
    const [rowSelected, setrowSelected] = useState({})

    const columns = [
        // {
        //     title: 'SNo',
        //     dataIndex: 'sno',
        //     key: 'sno',
        // }
        ,
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Keywords',
            dataIndex: 'keywords',
            key: 'keywords',
        },
        {
            title: 'Applied Rules',
            dataIndex: 'appliedRules',
            key: 'appliedRules',
        }, {
            title: 'Applied Questionnaires',
            dataIndex: 'appliedQuestionnaires',
            key: 'appliedQuestionnaires',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button onClick={() => {
                        setmode('edit')
                        setShowAddDrawer(true)
                        setTitle(record.title)
                        // setDescription(record.description)
                        setrowSelected(record)
                    }}>Edit</Button> */}
                    <Button onClick={() => {
                        deleteProductClassAction(record.id)
                    }}>Delete</Button>
                </Space>
            ),
        }
    ]

    const handleSubmit = () => {
        if (title != '' && keywords != '' & actions != [] && questionnaires != []) {
            if (mode == 'add') {
                addProductClassAction({
                    "id": productClassList && productClassList.length + 1 || 1,
                    "sno": productClassList && productClassList.length + 1 || 1,
                    "title": title,
                    "keywords": keywords,
                    "appliedRules": actions.toString(),
                    "appliedQuestionnaires": questionnaires.toString()
                    // "description": description
                })
                setTitle('')
                setKeywords('')
                setactions([])
                setquestionnaires([])
                // setDescription('')
                setShowAddDrawer(false)
            }
            // if(mode == "edit"){
            //     editCategoryAction({
            //         "id":rowSelected.id,
            //         "sno":rowSelected.id,
            //         "title": title,
            //         // "description": description
            //     })
            //     setTitle('')
            //     // setDescription('')
            //     setShowAddDrawer(false)
            //     setmode('add')
            //     setrowSelected({})
            // }


        } else {

        }
    }

    const handleDelete = () => {

    }


    return (
        <div>
            <Card title="Product Classes"
                extra={<Row gutter={16}>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => { setShowAddDrawer(!showAddDrawer) }
                            } >
                            <PlusOutlined />Add Product Class
                        </Button>
                    </Col></Row>} >
                <Table
                    columns={columns}
                    dataSource={productClassList}
                />
            </Card>
            <Drawer title="Add Product Class" placement="right" width="40%" onClose={() => {
                setrowSelected({})
                setmode('add')
                setTitle('')
                setKeywords('')
                setactions([])
                setquestionnaires([])
                // setDescription('')
                setShowAddDrawer(false)
            }} visible={showAddDrawer}>
                <Space direction="vertical" width="100%" size="middle">
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Title </Tag>
                    <Input style={{ width: 400 }} placeholder="Enter title of Product Class" onChange={e => setTitle(e.target.value)} value={title} />
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Keywords </Tag>
                    <Input style={{ width: 400 }} placeholder="Enter Keywords" onChange={e => setKeywords(e.target.value)} value={keywords} />
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Select Applied Rules </Tag>
                    <Select
                        mode="multiple"
                        // value={associatedCoreBusinessRule}
                        style={{ width: 400 }}
                        placeholder="Select applied rules"
                        onChange={val => setactions(val)}
                    >
                        {businessRulesList.map(item => <Option value={item.title} key={item.id}>{item.title}</Option>)}
                    </Select>

                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Select Applied Questionnaires </Tag>
                    <Select
                        mode="multiple"
                        // value={associatedCoreBusinessRule}
                        style={{ width: 400 }}
                        placeholder="Select applied questionnaires"
                        onChange={val => setquestionnaires(val)}
                    >
                        {questionnairesList.map(item => <Option value={item.question} key={item.id}>{item.question}</Option>)}
                    </Select>

                    {/* <Divider /> */}
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={() => {
                            setShowAddDrawer(false)
                            setrowSelected({})
                            setmode('add')
                            setTitle('')
                            setKeywords('')
                            setactions([])
                            setquestionnaires([])
                            // setDescription('')
                        }} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </div>
                    <Divider />
                </Space>
            </Drawer>

        </div>
    )
}



function Returns() {

    const { returnsList } = useSelector(state => state.productReturn)

    const tagcolors = {
        "Restock": "blue",
        "Refurbish": "green",
        "Dispose": "red"
    }

    const columns = [
        // {
        //     title: 'SNo',
        //     dataIndex: 'sno',
        //     key: 'sno',
        // }
        ,
        {
            title: 'Order Ref',
            dataIndex: 'orderRef',
            key: 'orderRef',
        },
        {
            title: 'Product Class',
            dataIndex: 'productClass',
            key: 'productClass',
        },
        {
            title: 'Product Title',
            dataIndex: 'productTitle',
            key: 'productTitle',
        },
        {
            title: 'Product Description',
            dataIndex: 'productDescription',
            key: 'productDescription',
        }, {
            title: 'Destination',
            dataIndex: 'appliedAction',
            key: 'appliedAction',
            render: (text, record) => <Tag color={tagcolors[record.appliedAction]}>{record.appliedAction}</Tag>
        }
    ]


    return (
        <div>
            <Card title="Returns">
                <Table
                    columns={columns}
                    dataSource={returnsList}
                />
            </Card>


        </div>
    )
}





function Questionnaires() {

    const { productClassList, businessRulesList, questionnairesList } = useSelector(state => state.productReturn)

    const [showAddDrawer, setShowAddDrawer] = useState(false)
    const [question, setquestion] = useState('')
    const [productClass, setproductClass] = useState('')
    const [optionCounter, setoptionCounter] = useState(1)
    const [options, setoptions] = useState({})



    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Product Class',
            dataIndex: 'productClass',
            key: 'productClass',
        },
        {
            title: 'Option - Destination',
            dataIndex: 'options',
            key: 'options',
            render: (text, record) => <ul style={{ listStyleType: "none" }}>{record.options.map(item => <li key={Math.random()}><Tag>{item.option} - {item.destination}</Tag></li>)}</ul>
        },
    ]

    useEffect(() => {
        console.log(questionnairesList)
    }, [questionnairesList])

    const handleSubmit = () => {
        console.log(options)
        if (question != '' && productClass != '' & options != {}) {

            addQuestionnaireAction({
                "id": questionnairesList && questionnairesList.length + 1 || 1,
                "sno": questionnairesList && questionnairesList.length + 1 || 1,
                "question": question,
                "productClass": productClass,
                "options": Object.values(options),
            })
            setoptions({})
            setquestion('')
            setproductClass('')
            setoptionCounter(1)
            setShowAddDrawer(false)



        } else {

        }
    }


    return (
        <div>
            <Card title="Questionnaires"
                extra={<Row gutter={16}>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => { setShowAddDrawer(!showAddDrawer) }
                            } >
                            <PlusOutlined />Add Questionnaire
                        </Button>
                    </Col></Row>} >
                <Table
                    columns={columns}
                    dataSource={questionnairesList}
                />
            </Card>
            <Drawer title="Add Questionnaire" placement="right" width="40%" onClose={() => {
                setShowAddDrawer(false)
            }} visible={showAddDrawer}>
                <Space direction="vertical" width="100%" size="middle">
                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Question </Tag>
                    <Input style={{ width: 400 }} placeholder="Enter title of Product Class" onChange={e => setquestion(e.target.value)} value={question} />

                    <Tag style={{ lineHeight: '28px', fontSize: '14px' }}>Select Product Class </Tag>
                    <Select

                        // value={associatedCoreBusinessRule}
                        style={{ width: 400 }}
                        placeholder="Select applied rules"
                        onChange={val => setproductClass(val)}
                    >
                        {productClassList.map(item => <Option value={item.title} key={item.id}>{item.title}</Option>)}
                    </Select>

                    <ul style={{ listStyleType: "none", padding: "0px" }}>{
                        [...Array(optionCounter).keys()].map((item, index) => <li style={{ padding: "0px", margin: "0px", marginTop: "30px" }} key={"li" + index}>
                            <div className="flex-row mb-10"><Tag>Option {index + 1}</Tag><Input key={"opt" + index + 1} placeholder={"Enter option " + index + 1} style={{ width: 330 }}
                                onChange={e => {
                                    let op = { ...options }
                                    if (!op[index]) op[index] = {}
                                    op[index]["option"] = e.target.value
                                    setoptions(op)
                                }}></Input></div>
                            <div className="flex-row mb-10"><Tag>Destination/Action</Tag><Select

                                // value={associatedCoreBusinessRule}
                                style={{ width: 275 }}
                                placeholder="Select applied rules"
                                onChange={val => {
                                    let op = { ...options }
                                    if (!op[index]) op[index] = {}
                                    op[index]["destination"] = val
                                    setoptions(op)
                                }}
                            >
                                {businessRulesList.map(item => <Option value={item.title} key={item.id}>{item.title}</Option>)}
                            </Select></div>
                        </li>)
                    }</ul>

                    <Button onClick={() => setoptionCounter(optionCounter + 1)} type="primary">Add Option and Destination/Action</Button>


                    <Divider />
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={() => {
                            setShowAddDrawer(false)
                            setoptionCounter(1)

                        }} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </div>
                    <Divider />
                </Space>
            </Drawer>

        </div>
    )
}

function AiModalInterface() {

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <>
            <Card title="Ai Model Interface" style={{ heigh: "100vh", height: "50vh" }}>
                <Space direction="vertical" size="large">
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload Model file</Button>
                    </Upload>

                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload Label file</Button>
                    </Upload>

                    <Input placeholder="Enter Version"></Input>
                    <Button type="primary">Submit</Button>

                </Space>
            </Card>

        </>
    )
}
