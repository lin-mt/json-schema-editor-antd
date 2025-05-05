import Ajv from 'ajv';
import { message, Modal, Radio, Row } from 'antd';
import { compileSchema, draft2020 } from 'json-schema-library';
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import MonacoEditor from '../MonacoEditor';
import { parseJsonStr, resolveJsonSchemaRef } from '../utils';

type ImportModalProps = {
  open: boolean;
  onOk?: (importValue: any) => void;
  onCancel?: () => void;
};

const ImportModal = (props: ImportModalProps) => {
  const { open, onOk, onCancel } = props;
  const { t } = useI18n();
  const [messageApi, contextHolder] = message.useMessage();
  const [importValue, setImportValue] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>();
  const [importType, setImportType] = useState<'json' | 'json-schema'>('json');

  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  useEffect(() => {
    setModalOpen(open);
  }, [open]);

  function onClose() {
    setModalOpen(false);
    setImportValue(undefined);
    editorRef.current?.setValue('');
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        title={t('Import')}
        width={900}
        open={modalOpen}
        onOk={async () => {
          if (!importValue || importValue.length === 0) {
            messageApi.warning(t('ImportEmptyJsonWarnMsg'));
            return;
          }
          const importObject = parseJsonStr(importValue);
          if (!importObject) {
            messageApi.warning(t('ImportNotJsonWarnMsg'));
            return;
          }
          let schema;
          switch (importType) {
            case 'json':
              schema = compileSchema(draft2020).createSchema(importObject);
              break;
            case 'json-schema':
              schema = await resolveJsonSchemaRef(importObject);
              break;
          }
          if (!schema) {
            messageApi.warning(t('ImportErrorContentWarnMsg'));
            return;
          } else {
            const ajv = new Ajv({ allErrors: true });
            const validateSchema = ajv.getSchema(
              'http://json-schema.org/draft-07/schema#',
            );
            if (validateSchema && !validateSchema(schema)) {
              const errorContent = validateSchema.errors?.map(
                (error, index) => {
                  const field = error.instancePath.split('/').pop() || 'root';
                  const message = `${field} ${error.message}`;
                  return (
                    <div key={index}>
                      {`Error in field "${field}": ${message}`}
                    </div>
                  );
                },
              );
              if ((errorContent?.length || 0) > 0) {
                messageApi.error({
                  content: <div>{errorContent}</div>,
                });
              }
              return;
            }
          }
          if (onOk) {
            onOk(schema);
          }
          onClose();
        }}
        onCancel={onClose}
      >
        <Row style={{ marginBottom: 16 }}>
          <Radio.Group
            value={importType}
            optionType="button"
            buttonStyle="solid"
            onChange={(type) => setImportType(type.target.value)}
            options={[
              { value: 'json', label: 'Json' },
              { value: 'json-schema', label: 'JsonSchema' },
            ]}
          />
        </Row>
        <Row>
          <MonacoEditor
            height={390}
            language="json"
            handleEditorDidMount={handleEditorDidMount}
            onChange={(value) => setImportValue(value)}
          />
        </Row>
      </Modal>
    </>
  );
};

export default ImportModal;
