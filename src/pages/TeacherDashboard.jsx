import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, AlertTriangle, Download, Play, RefreshCw, Eye } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TeacherDashboard() {
  const [sessionCode, setSessionCode] = useState('');
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  
  // 獲取所有玩家數據
  const { data: players = [], isLoading, refetch } = useQuery({
    queryKey: ['players'],
    queryFn: () => base44.entities.Player.list('-created_date', 100),
  });
  
  // 獲取遊戲會話
  const { data: sessions = [] } = useQuery({
    queryKey: ['sessions'],
    queryFn: () => base44.entities.GameSession.list('-created_date', 10),
  });
  
  // 計算統計數據
  const stats = {
    totalPlayers: players.length,
    avgStress: players.length > 0 
      ? Math.round(players.reduce((sum, p) => sum + (p.stress || 0), 0) / players.length) 
      : 0,
    avgHappiness: players.length > 0 
      ? Math.round(players.reduce((sum, p) => sum + (p.happiness || 0), 0) / players.length) 
      : 0,
    completedGames: players.filter(p => p.game_completed).length
  };
  
  // 路徑分佈
  const pathDistribution = {
    stable: players.filter(p => p.current_path === 'stable').length,
    creative: players.filter(p => p.current_path === 'creative').length,
    business: players.filter(p => p.current_path === 'business').length,
    tech: players.filter(p => p.current_path === 'tech').length,
    none: players.filter(p => !p.current_path).length
  };
  
  // 創建新遊戲會話
  const handleCreateSession = async () => {
    setIsCreatingSession(true);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      await base44.entities.GameSession.create({
        session_code: code,
        is_active: true,
        start_time: new Date().toISOString()
      });
      setSessionCode(code);
    } catch (error) {
      console.error('Error creating session:', error);
    }
    setIsCreatingSession(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 頂部標題 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">👩‍🏫 老師儀表板</h1>
            <p className="text-slate-500">監察學生遊戲進度同分析</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新數據
            </Button>
            <Link to={createPageUrl('Game')}>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                試玩遊戲
              </Button>
            </Link>
          </div>
        </div>
        
        {/* 會話管理 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🎮</span>
              課堂遊戲管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {sessionCode ? (
                <div className="flex items-center gap-4">
                  <div className="bg-violet-100 px-6 py-3 rounded-xl">
                    <p className="text-xs text-violet-600 mb-1">課堂代碼</p>
                    <p className="text-2xl font-mono font-bold text-violet-800">{sessionCode}</p>
                  </div>
                  <p className="text-sm text-slate-500">俾學生輸入呢個代碼加入課堂</p>
                </div>
              ) : (
                <Button onClick={handleCreateSession} disabled={isCreatingSession}>
                  {isCreatingSession ? '創建中...' : '創建新課堂'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* 統計卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.totalPlayers}</p>
                  <p className="text-sm text-slate-500">總玩家數</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.avgStress}%</p>
                  <p className="text-sm text-slate-500">平均壓力</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.avgHappiness}%</p>
                  <p className="text-sm text-slate-500">平均快樂</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stats.completedGames}</p>
                  <p className="text-sm text-slate-500">完成遊戲</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 路徑分佈熱圖 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>📊 路徑選擇分佈</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { key: 'stable', name: '穩定之路', icon: '🏢', color: '#22c55e', count: pathDistribution.stable },
                { key: 'creative', name: '創意之路', icon: '🎨', color: '#8b5cf6', count: pathDistribution.creative },
                { key: 'business', name: '商業之路', icon: '💼', color: '#f59e0b', count: pathDistribution.business },
                { key: 'tech', name: '科技之路', icon: '💻', color: '#3b82f6', count: pathDistribution.tech },
                { key: 'none', name: '未選擇', icon: '❓', color: '#94a3b8', count: pathDistribution.none }
              ].map(path => (
                <motion.div
                  key={path.key}
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: `${path.color}15`, borderColor: path.color, borderWidth: 2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-3xl">{path.icon}</span>
                  <p className="font-medium text-slate-700 mt-1">{path.name}</p>
                  <p className="text-2xl font-bold" style={{ color: path.color }}>{path.count}</p>
                  <p className="text-xs text-slate-500">
                    {stats.totalPlayers > 0 
                      ? Math.round((path.count / stats.totalPlayers) * 100) 
                      : 0}%
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* 學生列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>👥 學生列表</span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                匯出報告
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-slate-500">載入中...</div>
            ) : players.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <span className="text-4xl block mb-2">📭</span>
                暫時冇學生數據
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">學生</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">路徑</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">💰</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">😤</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">😊</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">狀態</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player) => (
                      <tr key={player.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">
                              {player.gender === 'male' ? '👦' : player.gender === 'female' ? '👧' : '🤖'}
                            </span>
                            <div>
                              <p className="font-medium text-slate-800">{player.name}</p>
                              <p className="text-xs text-slate-500">{player.age}歲</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {player.current_path ? (
                            <Badge style={{ 
                              backgroundColor: player.current_path === 'stable' ? '#22c55e20' : 
                                player.current_path === 'creative' ? '#8b5cf620' : 
                                player.current_path === 'business' ? '#f59e0b20' : '#3b82f620',
                              color: player.current_path === 'stable' ? '#22c55e' : 
                                player.current_path === 'creative' ? '#8b5cf6' : 
                                player.current_path === 'business' ? '#f59e0b' : '#3b82f6'
                            }}>
                              {player.current_path === 'stable' ? '🏢 穩定' : 
                               player.current_path === 'creative' ? '🎨 創意' : 
                               player.current_path === 'business' ? '💼 商業' : '💻 科技'}
                            </Badge>
                          ) : (
                            <span className="text-slate-400 text-sm">未選擇</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="font-mono text-sm">{player.money || 50}</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={`font-mono text-sm ${(player.stress || 0) > 70 ? 'text-red-600 font-bold' : ''}`}>
                            {player.stress || 30}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="font-mono text-sm">{player.happiness || 60}</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          {player.game_completed ? (
                            <Badge className="bg-green-100 text-green-700">完成</Badge>
                          ) : (
                            <Badge variant="outline">進行中</Badge>
                          )}
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* 事件控制區 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🎛️ 特殊事件控制</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: '8號風球', icon: '🌀', description: '全班觸發颱風事件' },
                { name: '經濟危機', icon: '📉', description: '全班金錢減少' },
                { name: '獎學金', icon: '🎓', description: '隨機學生獲得獎勵' },
                { name: '職業日', icon: '💼', description: '觸發職業試工任務' }
              ].map((event) => (
                <Button
                  key={event.name}
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4"
                >
                  <span className="text-3xl">{event.icon}</span>
                  <span className="font-medium">{event.name}</span>
                  <span className="text-xs text-slate-500 text-center">{event.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}