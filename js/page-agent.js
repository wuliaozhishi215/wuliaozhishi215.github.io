// 等待页面加载完成后执行
window.addEventListener('load', function() {
  // 初始化 agent 对象
  const agent = new PageAgent({
    model: 'qwen3.5-plus',
    baseURL: 'https://page-ag-testing-ohftxirgbn.cn-shanghai.fcapp.run',
    apiKey: 'NA',
    language: 'zh-CN',
    
    instructions: {

        system: `
        You are the intelligent assistant for the LDCT-AID Platform.

        Guidelines:
        - **Workflow Guidance**: Help users navigate through the Denoising, Diagnosis, and AI Assistant modules.
        - **Data Integrity**: Remind users to upload images in standard formats (e.g., DICOM, JPG) for optimal processing.
        - **Interpret Algorithms**: Explain complex concepts like "Adapter Design" and "Multi-level Feature Comparison" in accessible language for stakeholders.
        - **Error Handling**: If a backend Flask API returns an error during inference, explain the potential cause (e.g., low image quality) instead of just retrying.
        `
  }
  
  });

  // 确保 agent 面板初始状态为隐藏
  function hideAgentPanel() {
    if (typeof agent !== 'undefined' && agent && agent.panel) {
      agent.panel.hide();
      console.log('Agent panel hidden');
    }
  }

  // 延迟执行，确保 agent 对象完全初始化
  setTimeout(hideAgentPanel, 100);
  setTimeout(hideAgentPanel, 500);
  setTimeout(hideAgentPanel, 1000);

  // 添加悬浮按钮的 CSS 样式
  function addAgentButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .agent-toggle-btn {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 10px;
        border-radius: 5px;
        background-color: #913BFF;
        color: white;
        border: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .agent-toggle-btn:hover {
        background-color: #7a26e6;
        width: 90px;
        height: 12px;
      }
    `;
    document.head.appendChild(style);
  }

  // 创建悬浮按钮
  function createAgentButton() {
    // 检查按钮是否已存在
    if (!document.getElementById('agent-toggle-btn')) {
      const button =document.createElement('button');
      button.className = 'agent-toggle-btn';
      button.id = 'agent-toggle-btn';
      document.body.appendChild(button);
      return button;
    }
    return document.getElementById('agent-toggle-btn');
  }

  // 面板状态
  let agentPanelVisible = false;

  // 切换 agent 面板显示/隐藏的函数
  function toggleAgentPanel() {
    console.log('Toggle button clicked');
    if (typeof agent !== 'undefined' && agent && agent.panel) {
      console.log('Agent object exists, current state:', agentPanelVisible);
      if (agentPanelVisible) {
        agent.panel.hide();
        agentPanelVisible = false;
        console.log('Panel hidden');
      } else {
        agent.panel.show();
        agentPanelVisible = true;
        console.log('Panel shown');
      }
    } else {
      console.error('Agent object not found or not initialized');
    }
  }

  // 初始化悬浮按钮
  addAgentButtonStyles();
  const button = createAgentButton();
  button.addEventListener('click', toggleAgentPanel);

  console.log('Agent toggle button initialized');
});

