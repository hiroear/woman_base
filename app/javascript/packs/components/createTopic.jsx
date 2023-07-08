import React, {useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const space = /[^\s*$]/;

const CreateTopic = ({categories}) => {
  // react-hook-form の設定
  const { handleSubmit, formState: { errors }, control } = useForm({
    mode: "onChange",   // onChange毎にエラー表示
    defaultValues: {    // 初期値
      name: '',
      title: '',
      description: '',
      category_id: '',
    }
  });

  // モーダル開閉処理
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // フォームを axiosで送信 (POSTで topics#createへ)
  const onSubmit = (data) => {
    axios.post('/topics/', data)
    .then(resp => {
      console.log(resp);
      location.reload();
    })
    .catch(err => console.log(err))
  };

  return (
    <>
      <button className='create-topic-button' onClick={handleClickOpen}>
        <span className='plus-icon'>トピックを作成する</span>
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='create-topic-title' sx={{fontWeight: 'bold', padding: '16px 24px 0'}}>
          <span className="pen-icon"></span>トピックを作成する
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{padding: '10px 24px 0'}}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: {value: true, message:'ニックネームは必須です'},
                maxLength: { value: 20, message: '20文字以内で入力してください' },
                pattern: { value: space, message: 'スペースは無効です' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label="ニックネーム"
                  type="text"
                  fullWidth
                  variant="standard"
                  placeholder="20文字以内"
                  id='name'
                />
              )}
            />
            <span style={{ color: "red", fontSize: '13px' }} role="alert">{errors.name?.message}</span>

            <Controller
              control={control}
              name="title"
              rules={{
                required: 'タイトルは必須です',
                maxLength: { value: 48, message: '48文字以内で入力してください' },
                pattern: { value: space, message: 'スペースは無効です' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows='2'
                  margin="dense"
                  label="タイトル"
                  type="text"
                  fullWidth
                  variant="standard"
                  placeholder="48文字以内"
                  id='title'
                />
              )}
            />
            <span style={{ color: "red", fontSize: '13px' }} role="alert">{errors.title?.message}</span>

            <Controller
              control={control}
              name="description"
              rules={{
                required: '内容は必須です',
                pattern: { value: space, message: 'スペースは無効です' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows='5'
                  margin="dense"
                  label="内容"
                  type="text"
                  fullWidth
                  variant="standard"
                  placeholder="内容を入力してください"
                  id='description'
                />
              )}
            />
            <p style={{ color: "red", fontSize: '13px' }} role="alert">{errors.description?.message}</p>

            <Controller
              control={control}
              name="category_id"
              rules={{
                required: 'カテゴリを選択してください'
              }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="category-select-label">カテゴリを選択</InputLabel>
                  <Select
                    {...field}
                    labelId="category-select-label"
                    label="category"
                  >
                    {categories.map(category => <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem> )}
                  </Select>
                </FormControl>
              )}
            />
            <p style={{ color: "red", fontSize: '13px' }} role="alert">{errors.category_id?.message}</p>
          </DialogContent>

          <DialogActions>
            <Button
              sx={{
                width: '18%',
                backgroundColor: '#4d83a7',
                color: '#fff',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                ':hover': {
                  backgroundColor: '#2e5c7a'
                }
              }}
              onClick={handleClose}>
                閉じる
            </Button>
            <Button
              sx={{
                width: '18%',
                backgroundColor: '#ed4ea0',
                color: '#fff',
                fontWeight: 'bold',
                border: 'none',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                ':hover': {
                  backgroundColor: '#b3045e'
                }
              }}
              type='submit'>
                作成する
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default CreateTopic;