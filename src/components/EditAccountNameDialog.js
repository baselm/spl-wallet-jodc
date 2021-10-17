import React, { useState } from 'react';
import DialogForm from './DialogForm';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { useTranslation } from 'react-i18next';
export default function EditAccountNameDialog({
  open,
  oldName,
  onClose,
  onEdit,
}) {
  const [name, setName] = useState(oldName);
  const {t} = useTranslation();
  return (
    <DialogForm
      open={open}
      onEnter={() => setName(oldName)}
      onClose={onClose}
      onSubmit={() => onEdit(name.trim())}
      fullWidth
    >
      <DialogTitle>{t('editAccount')}</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label= {t('accountName')}
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Close')}</Button>
        <Button type="submit" color="primary">
          {t('save')}
        </Button>
      </DialogActions>
    </DialogForm>
  );
}
