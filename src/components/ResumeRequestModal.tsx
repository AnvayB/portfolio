import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, FileText } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

interface ResumeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeRequestModal = ({ isOpen, onClose }: ResumeRequestModalProps) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const roleOptions = useMemo(() => [
    { value: 'data-analyst', label: 'Data Analyst', resumeFile: 'Anvay_Bhanap_Data_Analyst.pdf' },
    { value: 'data-engineer', label: 'Data Engineer', resumeFile: 'Anvay_Bhanap_Data_Engineer.pdf' },
    { value: 'data-science', label: 'Data Science', resumeFile: 'Anvay_Bhanap_Data_Science.pdf' },
    { value: 'full-stack', label: 'Full-Stack', resumeFile: 'Anvay_Bhanap_Full_Stack.pdf' },
  ], []);

  // Update hidden fields when email or role changes
  useEffect(() => {
    if (formRef.current) {
      const messageField = formRef.current.querySelector('input[name="message"]') as HTMLInputElement;
      const subjectField = formRef.current.querySelector('input[name="subject"]') as HTMLInputElement;
      const roleField = formRef.current.querySelector('input[name="role_interest"]') as HTMLInputElement;
      
      const roleLabel = roleOptions.find(r => r.value === role)?.label || 'Position Not Selected';
      
      if (messageField) {
        messageField.value = `Resume request for ${roleLabel} position from ${email || 'email not provided'}`;
      }
      if (subjectField) {
        subjectField.value = `Resume Request - ${roleLabel}`;
      }
      if (roleField) {
        roleField.value = roleLabel;
      }
    }
  }, [email, role, roleOptions]);

  // Function to download the appropriate resume
  const downloadResume = (roleValue: string) => {
    const selectedRole = roleOptions.find(r => r.value === roleValue);
    if (selectedRole) {
      const link = document.createElement('a');
      link.href = `/resumes/${selectedRole.resumeFile}`;
      link.download = selectedRole.resumeFile;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send notification to you about the resume request using the existing template structure
      const result = await emailjs.sendForm(
        'service_d61vlcw', // Using the same service ID from ContactSection
        'template_2q6uc8b', // Using the same template but with resume-specific content
        formRef.current!,
        'SZctaaxt7KKpSXd4C' // Using the same public key
      );

      console.log('Resume request sent:', result.text);
      setIsSuccess(true);
      
      // Download the appropriate resume immediately
      downloadResume(role);
      
      toast({
        title: "Resume downloaded successfully!",
        description: "Your request has been logged and the resume is downloading.",
        variant: "default",
      });

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setEmail('');
        setRole('');
        setIsSuccess(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.log('Resume request failed:', (error as Error).message);
      toast({
        title: "Request failed",
        description: "Something went wrong. Please try again or contact directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setEmail('');
      setRole('');
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="w-[95vw] max-w-md mx-auto bg-background/95 backdrop-blur-sm border-border/50">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Request Resume
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-3 sm:right-4 sm:top-4 opacity-70 hover:opacity-100 p-1.5 sm:p-2"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6 pt-2 sm:pt-4"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    Resume Downloaded!
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground px-2">
                    Your request has been logged and the resume should be downloading now.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="text-center mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base text-muted-foreground px-2">
                      Please enter your email to receive the resume
                    </p>
                  </div>

                  {/* Hidden fields for EmailJS template compatibility */}
                  <input type="hidden" name="user_name" value="Resume Request" />
                  <input 
                    type="hidden" 
                    name="message" 
                    value={`Resume request for ${roleOptions.find(r => r.value === role)?.label || 'Position Not Selected'} position from ${email || 'email not provided'}`} 
                  />
                  <input type="hidden" name="subject" value={`Resume Request - ${roleOptions.find(r => r.value === role)?.label || 'Position Not Selected'}`} />
                  <input type="hidden" name="role_interest" value={roleOptions.find(r => r.value === role)?.label || ''} />

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="user_email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@company.com"
                      required
                      className="bg-input/50 border-border focus:border-primary text-sm sm:text-base"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm sm:text-base text-foreground">
                      Area of Interest
                    </Label>
                    <Select value={role} onValueChange={setRole} disabled={isSubmitting}>
                      <SelectTrigger className="bg-input/50 border-border focus:border-primary text-sm sm:text-base">
                        <SelectValue placeholder="Select role type" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !email || !role}
                    className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 py-3 sm:py-4 text-base sm:text-lg font-semibold glow-primary disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                      />
                    ) : null}
                    {isSubmitting ? 'Sending Request...' : 'Request Resume'}
                  </Button>
                </form>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
