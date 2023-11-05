import { Stack, Skeleton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { memo } from 'react'

export const TodolistSkeleton = memo(() => {
  return (
    <Grid lg={4} md={6} sm={12}>
      <Stack
        spacing={2}
        alignItems='center'
        sx={{ pt: 4, pb: 1.5, pl: 1.5, pr: 1.5, bgcolor: 'background.blocks', position: 'relative', boxShadow: 5 }}
      >
        <Skeleton variant='rectangular' width={'100%'} height={50} sx={{ animationDuration: '0.7s' }} />
        <Skeleton variant='rectangular' width={'80%'} height={55} sx={{ animationDuration: '0.7s' }} />
        <Skeleton variant='rectangular' width={'100%'} height={55} sx={{ animationDuration: '0.7s' }} />
        <Skeleton variant='rectangular' width={'60%'} height={35} sx={{ animationDuration: '0.7s' }} />
        <Skeleton variant='rectangular' width={'50%'} height={30} sx={{ animationDuration: '0.7s' }} />
      </Stack>
    </Grid>
  )
})
