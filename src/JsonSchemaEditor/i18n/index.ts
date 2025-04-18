import { ConfigProvider } from 'antd';
import { useContext } from 'react';

export type Lang = 'en-us' | 'zh-cn' | string;

export type LocaleMessages = Record<string, string>;

const defaultMessages: Record<Lang, LocaleMessages> = {
  'en-us': {
    PropertyPlaceholder: 'Please input the property name',
    PropertyNameEmptyWarnMsg: 'Property name cannot be empty',
    TitlePlaceholder: 'Please input the title',
    DescriptionPlaceholder: 'Please input the description',
    AdvancedSettings: 'Advanced Settings',
    SiblingNodes: 'Sibling Nodes',
    ChildNodes: 'Child Nodes',
    AddNode: 'Add Node',
    ImportJson: 'Import JSON',
    DeleteNode: 'Delete Node',
    Import: 'Import',
    ImportEmptyJsonWarnMsg: 'Please input the JSON data to import',
    ImportNotJsonWarnMsg: 'The imported content is not in JSON format',
    ImportErrorContentWarnMsg:
      'The imported content is incorrect, please check and try again',
    BasicSettings: 'Basic Settings',
    DefaultValue: 'Default Value',
    DefaultValuePlaceholder: 'Please input the default value',
    SelectDefaultValuePlaceholder: 'Please select the default value',
    MinimumLength: 'Minimum Length',
    MinimumLengthPlaceholder: 'Please input the minimum length',
    MaximumLength: 'Maximum Length',
    MaximumLengthPlaceholder: 'Please input the maximum length',
    Minimum: 'Minimum Value',
    MinimumPlaceholder: 'Please input the minimum value',
    Maximum: 'Maximum Value',
    MaximumPlaceholder: 'Please input the maximum value',
    ExclusiveMinimum: 'Exclusive Minimum',
    ExclusiveMinimumPlaceholder: 'Please input the exclusive minimum value',
    ExclusiveMaximum: 'Exclusive Maximum',
    ExclusiveMaximumPlaceholder: 'Please input the exclusive maximum value',
    RegularMatch: 'Regular Expression',
    RegularMatchPlaceholder: 'Please input a regular expression',
    Format: 'Format',
    FormatPlaceholder: 'Please select a string format',
    UniqueItems: 'Unique Items',
    MinItems: 'Minimum Number of Items',
    MinItemsPlaceholder: 'Please input the minimum number of items',
    MaxItems: 'Maximum Number of Items',
    MaxItemsPlaceholder: 'Please input the maximum number of items',
    Enums: 'Enumerations',
    EnumsPlaceholder: 'Please input enumeration values',
    AddEnums: 'Add Enumeration',
  },
  'zh-cn': {
    PropertyPlaceholder: '请输入属性名称',
    PropertyNameEmptyWarnMsg: '属性名称不能为空',
    TitlePlaceholder: '请输入标题',
    DescriptionPlaceholder: '请输入描述信息',
    AdvancedSettings: '高级设置',
    SiblingNodes: '同级节点',
    ChildNodes: '子级节点',
    AddNode: '添加节点',
    ImportJson: '导入Json',
    DeleteNode: '删除节点',
    Import: '导入',
    ImportEmptyJsonWarnMsg: '请输入导入的 Json 数据',
    ImportNotJsonWarnMsg: '导入的内容不是 Json 格式的数据',
    ImportErrorContentWarnMsg: '导入的内容有误，请检查后重新导入',
    BasicSettings: '基本设置',
    DefaultValue: '默认值',
    DefaultValuePlaceholder: '请输入默认值',
    SelectDefaultValuePlaceholder: '请选择默认值',
    MinimumLength: '最小长度',
    MinimumLengthPlaceholder: '请输入最小长度',
    MaximumLength: '最大长度',
    MaximumLengthPlaceholder: '请输入最大长度',
    Minimum: '最小值',
    MinimumPlaceholder: '请输入最小值',
    Maximum: '最大值',
    MaximumPlaceholder: '请输入最大值',
    ExclusiveMinimum: '排他最小值',
    ExclusiveMinimumPlaceholder: '请输入排他最小值',
    ExclusiveMaximum: '排他最大值',
    ExclusiveMaximumPlaceholder: '请输入排他最大值',
    RegularMatch: '正则匹配',
    RegularMatchPlaceholder: '请输入正则匹配公式',
    Format: '格式',
    FormatPlaceholder: '请选择字符串格式',
    UniqueItems: '元素唯一',
    MinItems: '最少元素个数',
    MinItemsPlaceholder: '请输入最少元素个数',
    MaxItems: '最多元素个数',
    MaxItemsPlaceholder: '请输入最多元素个数',
    Enums: '枚举',
    EnumsPlaceholder: '请输入枚举值',
    AddEnums: '添加枚举',
  },
};

let customMessages: Record<Lang, LocaleMessages> = {};

/**
 * 注册扩展语言包，可覆盖默认语言包
 */
export const registerLocale = (lang: Lang, messages: LocaleMessages) => {
  customMessages[lang] = {
    ...(customMessages[lang] || {}),
    ...messages,
  };
};

export const useI18n = () => {
  const config = useContext(ConfigProvider.ConfigContext);
  const currentLang: Lang = config?.locale?.locale || 'en-us';

  const messages = {
    ...defaultMessages[currentLang],
    ...customMessages[currentLang],
  };

  const t = (key: string) => messages[key] || key;

  return {
    locale: currentLang,
    t,
  };
};
