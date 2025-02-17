interface AuthToggleProps {
    isLogin: boolean;
    onToggle: () => void;
  }
  
  export default function AuthToggle({ isLogin, onToggle }: AuthToggleProps) {
    return (
      <div className="mt-6 text-center">
        <button
          onClick={onToggle}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    );
  }