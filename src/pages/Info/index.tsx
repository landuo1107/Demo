import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag,Image } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  id?: number;
  name?: string;
  avatar?: string;
  wxName?: string;
  wxNo?: string;
  sendFlag?: boolean;
  realSheng?: string;
  realShi?: string;
  realQu?: string;
  group: string;
  groupDate?: string;
  dqDate?: string;

};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title:'编号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: "姓名",
    dataIndex: "name",
    formItemProps: {
      rules: [{ required: true, message: "请输入姓名" }],
    },
      align: 'center',
  },
  {
    title: "头像",
    dataIndex: "avatar",
    valueType: "image",
    search: false,
    align: 'center',
  },
  {
    title: "昵称",
    dataIndex: "wxName",
    search: false,
    align: 'center',
  },
  {
    title: '微信号',
    dataIndex: 'wxNo',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: "省",
    dataIndex: "realSheng",
    search: false,
    align: 'center',
  },
  {
    title: "市",
    dataIndex: "realShi",
    search: false,
    align: 'center',
  },
  {
    title: "所在区",
    dataIndex: "realQu",
    search: false,
    ellipsis: true,
    align: 'center',
  },
  {
    title: "所属群",
    dataIndex: "group",
    ellipsis: true,
    search: false,
    align: 'center',
  },
  {
    title: "首次申请时间",
    dataIndex: "dqDate",
    search: false,
    align: 'center',
  },
  {
    title: "入群时间",
    dataIndex: "groupDate",
    search: false,
    align: 'center',
  },
  {title: "是否开启",
  dataIndex: "sendFlag",
  valueType: "switch",
  align: 'center',
  render: (_, item) =>
    item.sendFlag ? (
      <Tag color="green">已开启</Tag>
    ) : (
      <Tag color="red">未开启</Tag>
    )},
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看提现明细
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // request={async (params, sort, filter) => {
      //   console.log(sort, filter);
      //   await waitTime(2000);
      //   return request<{
      //     data: GithubIssueItem[];
      //   }>('https://proapi.azurewebsites.net/github/issues', {
      //     params,
      //   });
      // }}
      defaultData={
        [{
          id: 1,
          name: '赵明',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep3KZwhfpgOSogWTIz0QIHqicrhH9ull2of9hvibZuThoJbyo2hnkCvibe3x21Z09POoibJBf5bpqQzYQ/132',
          wxNo: 'ocwVJ6yCXjc660YaMFKn4R0dbGP0',
          wxName: '江河湖海',
          sendFlag: true,
          realSheng: '北京市',
          realShi: '北京市',
          realQu: '海淀区文慧园斜街',
          group: '（YY-6班）登贵堂中医课堂',
          groupDate: '2023/11/17 21:07:13',
          dqDate: '2023/11/17 21:07:06',
      },{
        id: 2,
        name: '李三',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJDHGxYQwyWUZhkvkj0bCujzZzza95NyYXZ6SyzP2uoMFSIjNJZGFquREtOEbxiaxTPmglIX0ROMWA/132',
        wxNo: 'ocwVJ627CDl8CWeMMk-Wff3n7BgM',
        wxName: '家是温馨的港湾',
        sendFlag: false,
        realSheng: '北京市',
        realShi: '北京市',
        realQu: '海淀区文慧园斜街',
        group: '（YY-6班）登贵堂中医课堂',
        groupDate: '2023/11/17 21:07:13',
        dqDate: '2023/11/17 21:07:06',
    }]
    }
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};