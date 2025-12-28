import { HugeiconsIcon } from '@hugeicons/react'
import { GithubIcon } from '@hugeicons/core-free-icons'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function GetStartedBtn() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className={'cursor-pointer'}>Get Started</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signin to get started</DialogTitle>
            <DialogDescription>Please signin to use MarkLink</DialogDescription>
          </DialogHeader>

          <Button variant={'outline'} className={'cursor-pointer'}>
            <HugeiconsIcon icon={GithubIcon} />
            Signin with Github
          </Button>

          <DialogFooter className="mt-4">
            <p className="text-center">
              By Clicking Signin, you agree to our{' '}
              <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
