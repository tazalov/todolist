import { Header } from 'widgets/Header'
import { ErrorSnackbar, SuccessSnackbar } from 'entities/notification'
import { AppRouter } from './providers/routes/ui/AppRouter'

export const App = () => {
  return (
    <>
      <Header />
      <AppRouter />
      <ErrorSnackbar />
      <SuccessSnackbar />
    </>
  )
}
